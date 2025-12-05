package com.pucintegra.api.dto;

public record RegisterDTO(
    String nome,
    String cpf,
    String matricula,
    String emailInstitucional,
    String senha,
    String tipoPessoa
) {}