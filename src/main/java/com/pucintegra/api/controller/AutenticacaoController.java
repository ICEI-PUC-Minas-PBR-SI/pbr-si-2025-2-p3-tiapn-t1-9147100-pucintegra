package com.pucintegra.api.controller;

import com.pucintegra.api.config.TokenService;
import com.pucintegra.api.dto.RegisterDTO;
import com.pucintegra.api.repository.PessoaRepository;
import com.pucintegra.api.model.Pessoa;
import com.pucintegra.api.model.Aluno;
import com.pucintegra.api.model.Professor;
import com.pucintegra.api.model.TipoPessoa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AutenticacaoController {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private TokenService tokenService; 

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 1. LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String senhaDigitada = dados.get("senha");

        Optional<Pessoa> usuarioOpt = pessoaRepository.findByEmailInstitucional(email);

        if (usuarioOpt.isPresent()) {
            Pessoa p = usuarioOpt.get();
            boolean senhaConfere = passwordEncoder.matches(senhaDigitada, p.getSenha());
            
            // Fallback para senhas antigas (se houver)
            if (!senhaConfere && senhaDigitada.equals(p.getSenha())) {
                senhaConfere = true;
            }

            if (senhaConfere) {
                String token = tokenService.generateToken(p);

                return ResponseEntity.ok(Map.of(
                    "message", "Login realizado com sucesso",
                    "token", token, 
                    "matricula", p.getMatricula(),
                    "nome", p.getNome(),
                    "tipo", p.getTipoPessoa()
                ));
            }
        }
        return ResponseEntity.status(401).body(Map.of("error", "E-mail ou senha inválidos"));
    }

    // 2. CADASTRO
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data) {
        if (pessoaRepository.existsById(data.matricula())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Matrícula já cadastrada!"));
        }
        if (pessoaRepository.findByEmailInstitucional(data.emailInstitucional()).isPresent()) {
             return ResponseEntity.badRequest().body(Map.of("error", "E-mail já cadastrado!"));
        }

        try {
            Pessoa novaPessoa; 
            String tipoTexto = data.tipoPessoa();
            
            if (tipoTexto != null && tipoTexto.equalsIgnoreCase("Professor")) {
                novaPessoa = new Professor();
                novaPessoa.setTipoPessoa(TipoPessoa.Professor);
            } else {
                novaPessoa = new Aluno();
                novaPessoa.setTipoPessoa(TipoPessoa.Aluno);
            }

            novaPessoa.setNome(data.nome());
            novaPessoa.setCpf(data.cpf());
            novaPessoa.setMatricula(data.matricula());
            novaPessoa.setEmailInstitucional(data.emailInstitucional());
            
            String senhaCriptografada = passwordEncoder.encode(data.senha());
            novaPessoa.setSenha(senhaCriptografada);

            pessoaRepository.save(novaPessoa);

            return ResponseEntity.ok(Map.of("message", "Usuário cadastrado com sucesso!"));
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", "Erro ao cadastrar: " + e.getMessage()));
        }
    }

    // 3. RECUPERAÇÃO DE SENHA
    @PostMapping("/recover-password")
    public ResponseEntity<?> recoverPassword(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String cpf = dados.get("cpf");
        String novaSenha = dados.get("novaSenha");

        Optional<Pessoa> userOpt = pessoaRepository.findByEmailInstitucional(email);

        if (userOpt.isPresent()) {
            Pessoa p = userOpt.get();
            if (p.getCpf().equals(cpf)) {
                String senhaCriptografada = passwordEncoder.encode(novaSenha);
                p.setSenha(senhaCriptografada);
                pessoaRepository.save(p);
                return ResponseEntity.ok(Map.of("message", "Senha alterada com sucesso!"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "CPF não corresponde ao e-mail informado."));
            }
        }
        return ResponseEntity.badRequest().body(Map.of("error", "E-mail não encontrado."));
    }
}
