package com.pucintegra.api.controller;

import com.pucintegra.api.model.Aluno;
import com.pucintegra.api.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/monitoria")
public class MonitoriaController {

    @Autowired
    private AlunoRepository alunoRepository;

    // Endpoint para promover um aluno a Monitor
    @PostMapping("/promover")
    public ResponseEntity<?> promoverAluno(@RequestBody Map<String, String> dados) {
        String matriculaAluno = dados.get("matriculaAluno");

        if (matriculaAluno == null || matriculaAluno.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Matrícula é obrigatória."));
        }

        // Busca especificamente no repositório de Aluno
        Optional<Aluno> alunoOpt = alunoRepository.findById(matriculaAluno);

        if (alunoOpt.isPresent()) {
            Aluno aluno = alunoOpt.get();
            aluno.setEhMonitor(true); // Define como monitor
            alunoRepository.save(aluno);
            
            return ResponseEntity.ok(Map.of("message", "Sucesso! O aluno " + aluno.getNome() + " agora é Monitor."));
        }
        
        return ResponseEntity.badRequest().body(Map.of("error", "Aluno não encontrado com essa matrícula."));
    }
}