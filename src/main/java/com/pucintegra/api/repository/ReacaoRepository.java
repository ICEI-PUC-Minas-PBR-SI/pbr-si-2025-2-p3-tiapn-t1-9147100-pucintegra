package com.pucintegra.api.repository;

import com.pucintegra.api.model.Reacao;
import com.pucintegra.api.dto.MinhasInteracoesDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.List;

public interface ReacaoRepository extends JpaRepository<Reacao, Long> {
    
    // Parâmetros mudaram de Long para Integer
    Optional<Reacao> findByIdPerguntaAndMatriculaPessoa(Long idPergunta, String matriculaPessoa);
    
    Optional<Reacao> findByIdRespostaAndMatriculaPessoa(Integer idResposta, String matriculaPessoa);

    @Query(value = """
        SELECT 
            r.Id_Reacao AS id, 
            r.Tipo_Reacao AS tipo, 
            r.Data_Reacao AS data,
            COALESCE(p.Titulo, CONCAT('Resposta em: ', p2.Titulo)) AS titulo
        FROM reacao r
        LEFT JOIN pergunta p ON r.Id_Pergunta = p.Id_Pergunta
        LEFT JOIN resposta res ON r.Id_Resposta = res.Id_Resposta
        LEFT JOIN pergunta p2 ON res.Id_Pergunta = p2.Id_Pergunta
        WHERE r.Matricula_Pessoa = :matricula
        ORDER BY r.Data_Reacao DESC
    """, nativeQuery = true)
    List<MinhasInteracoesDTO> findInteracoesPorMatricula(@Param("matricula") String matricula);    
}