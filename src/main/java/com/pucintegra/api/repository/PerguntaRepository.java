package com.pucintegra.api.repository;

import com.pucintegra.api.model.Pergunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PerguntaRepository extends JpaRepository<Pergunta, Integer> {
    List<Pergunta> findByMatriculaAluno(String matriculaAluno);
    
    List<Pergunta> findAllByOrderByDataCriacaoDesc();
}