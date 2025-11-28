package com.pucintegra.api.controller;

import com.pucintegra.api.repository.PessoaRepository;
import com.pucintegra.api.model.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Import novo
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AutenticacaoController {

    @Autowired
    private PessoaRepository pessoaRepository;

    // Ferramenta de criptografia
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String senhaDigitada = dados.get("senha");

        // 1. Busca apenas pelo e-mail
        Optional<Pessoa> usuarioOpt = pessoaRepository.findByEmailInstitucional(email);

        if (usuarioOpt.isPresent()) {
            Pessoa p = usuarioOpt.get();
            
            // 2. Verifica se a senha bate (Hash do Banco vs Senha Digitada)
            // Se a senha no banco não for hash (for texto puro), essa verificação pode falhar, 
            // então cuidado ao misturar tipos.
            boolean senhaConfere = passwordEncoder.matches(senhaDigitada, p.getSenha());
            
            // Fallback: Se não conferir pelo hash, tenta comparar texto puro (para testes antigos)
            if (!senhaConfere && senhaDigitada.equals(p.getSenha())) {
                senhaConfere = true;
            }

            if (senhaConfere) {
                return ResponseEntity.ok(Map.of(
                    "message", "Login realizado com sucesso",
                    "matricula", p.getMatricula(),
                    "nome", p.getNome(),
                    "tipo", p.getTipoPessoa()
                ));
            }
        }
        
        return ResponseEntity.status(401).body(Map.of("error", "E-mail ou senha inválidos"));
    }
}