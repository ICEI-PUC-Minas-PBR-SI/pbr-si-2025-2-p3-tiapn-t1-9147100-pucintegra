package com.pucintegra.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/reacoes")
public class ReacaoController {

    // Endpoint Fake para salvar reação (Simulação para não travar o front)
    // Se quiser implementar real, precisaria da Entity Reacao e ReacaoRepository
    @PostMapping
    public ResponseEntity<?> salvarReacao(@RequestBody Map<String, Object> dados) {
        System.out.println("Reação recebida: " + dados);
        return ResponseEntity.ok(Map.of("message", "Reação registrada!"));
    }

    // Endpoint Fake para buscar reações do usuário (Perfil)
    @GetMapping("/usuario/{matricula}")
    public ResponseEntity<?> getMinhasReacoes(@PathVariable String matricula) {
        return ResponseEntity.ok(List.of()); // Retorna lista vazia para não quebrar o perfil
    }
}