package com.passaregua.app.dtos.auth;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    @NotBlank
    @Size(max = 100)
    private String primeiroNome;

    @NotBlank
    @Size(max = 100)
    private String ultimoNome;

    // Pode ser email ou celular; mapeamos no backend
    @NotBlank
    @Size(max = 150)
    private String contato;

    @NotBlank
    @Size(min = 4, max = 255)
    private String senha;

    // Front pode enviar valores nao padronizados; mapeamos internamente
    private String genero;

    @Min(0)
    @Max(200)
    private Integer idade;
}

