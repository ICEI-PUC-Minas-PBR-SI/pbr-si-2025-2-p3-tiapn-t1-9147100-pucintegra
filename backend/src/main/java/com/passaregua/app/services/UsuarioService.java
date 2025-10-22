package com.passaregua.app.services;

import com.passaregua.app.dtos.UsuarioRequest;
import com.passaregua.app.dtos.UsuarioResponse;
import com.passaregua.app.models.Usuario;
import com.passaregua.app.repositories.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.HexFormat;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public UsuarioResponse criar(UsuarioRequest req) {
        if (repository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado");
        }
        Usuario u = Usuario.builder()
                .primeiroNome(req.getPrimeiroNome())
                .ultimoNome(req.getUltimoNome())
                .email(req.getEmail())
                .celular(req.getCelular())
                .senha(req.getSenha())
                .hashSenha(hash(req.getSenha()))
                .genero(req.getGenero())
                .idade(req.getIdade())
                .build();
        u = repository.save(u);
        return toResponse(u);
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listar() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obter(Long id) {
        Usuario u = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
        return toResponse(u);
    }

    public UsuarioResponse atualizar(Long id, UsuarioRequest req) {
        Usuario u = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        // Se email mudar, verificar conflito
        if (req.getEmail() != null && !req.getEmail().equalsIgnoreCase(u.getEmail())
                && repository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado");
        }

        if (req.getPrimeiroNome() != null) u.setPrimeiroNome(req.getPrimeiroNome());
        if (req.getUltimoNome() != null) u.setUltimoNome(req.getUltimoNome());
        if (req.getEmail() != null) u.setEmail(req.getEmail());
        if (req.getCelular() != null) u.setCelular(req.getCelular());
        if (req.getGenero() != null) u.setGenero(req.getGenero());
        if (req.getIdade() != null) u.setIdade(req.getIdade());

        if (req.getSenha() != null && !req.getSenha().isEmpty()) {
            u.setSenha(req.getSenha());
            u.setHashSenha(hash(req.getSenha()));
        }

        u = repository.save(u);
        return toResponse(u);
    }

    public void remover(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }
        repository.deleteById(id);
    }

    private UsuarioResponse toResponse(Usuario u) {
        return UsuarioResponse.builder()
                .id(u.getId())
                .primeiroNome(u.getPrimeiroNome())
                .ultimoNome(u.getUltimoNome())
                .email(u.getEmail())
                .celular(u.getCelular())
                .genero(u.getGenero())
                .idade(u.getIdade())
                .build();
    }

    private String hash(String senha) {
        if (senha == null) return null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(senha.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Algoritmo de hash não encontrado", e);
        }
    }
}

