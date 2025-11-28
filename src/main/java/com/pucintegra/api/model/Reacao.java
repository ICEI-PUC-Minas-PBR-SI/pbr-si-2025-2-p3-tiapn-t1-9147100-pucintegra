package com.pucintegra.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reacao")
public class Reacao {

   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Reacao")
    private Long idReacao; // Esse continua Long (PK)

    @Column(name = "Id_Pergunta")
    private Long idPergunta; // MUDOU PARA INTEGER

    @Column(name = "Id_Resposta")
    private Integer idResposta; // MUDOU PARA INTEGER

    @Column(name = "Matricula_Pessoa", nullable = false)
    private String matriculaPessoa;

    @Column(name = "Tipo_Reacao", nullable = false)
    private String tipoReacao;

    @Column(name = "Data_Reacao")
    private LocalDateTime dataReacao;

    @PrePersist
    protected void onCreate() {
        dataReacao = LocalDateTime.now();
    }
}