package com.pucintegra.api.repository;

import com.pucintegra.api.model.Pergunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PerguntaRepository extends JpaRepository<Pergunta, Long> {
    // ... (Outros métodos de busca mantidos) ...

    List<Pergunta> findByMatriculaAluno(String matriculaAluno);
    long countByMatriculaAluno(String matriculaAluno);
    List<Pergunta> findAllByOrderByDataCriacaoDesc();
    List<Pergunta> findByIdDisciplinaOrderByDataCriacaoDesc(Integer idDisciplina);
    List<Pergunta> findByTituloContainingOrConteudoContainingOrderByDataCriacaoDesc(String titulo, String conteudo);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO PERGUNTA_ANEXO (Id_Pergunta, Nome_Arquivo, Caminho_Arquivo, Tipo_Arquivo) VALUES (:idPergunta, :nome, :caminho, :tipo)", nativeQuery = true)
    void saveAnexo(Long idPergunta, String nome, String caminho, String tipo);

    @Query(value = "SELECT Id_PalavraChave FROM PALAVRA_CHAVE WHERE Palavra = :palavra LIMIT 1", nativeQuery = true)
    Long findIdPalavraChave(String palavra);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO PALAVRA_CHAVE (Palavra) VALUES (:palavra)", nativeQuery = true)
    void savePalavraChave(String palavra);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO PERGUNTA_PALAVRACHAVE (Id_Pergunta, Id_PalavraChave) VALUES (:idPergunta, :idPalavra)", nativeQuery = true)
    void linkPalavraChave(Long idPergunta, Long idPalavra);

    @Query(value = "SELECT Caminho_Arquivo FROM PERGUNTA_ANEXO WHERE Id_Pergunta = :idPergunta", nativeQuery = true)
    List<String> findAnexosUrl(Long idPergunta);

    @Query(value = "SELECT pc.Palavra FROM PALAVRA_CHAVE pc JOIN PERGUNTA_PALAVRACHAVE pp ON pc.Id_PalavraChave = pp.Id_PalavraChave WHERE pp.Id_Pergunta = :idPergunta", nativeQuery = true)
    List<String> findTags(Long idPergunta);
}