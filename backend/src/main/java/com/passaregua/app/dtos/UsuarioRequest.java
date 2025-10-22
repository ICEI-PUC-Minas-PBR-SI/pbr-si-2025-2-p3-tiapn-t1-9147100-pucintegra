package com.passaregua.app.dtos;

import com.passaregua.app.models.Genero;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioRequest {
    @NotBlank
    @Size(max = 100)
    private String primeiroNome;

    @NotBlank
    @Size(max = 100)
    private String ultimoNome;

    @NotBlank
    @Email
    @Size(max = 150)
    private String email;

    @Size(max = 30)
    private String celular;

    @Size(max = 255)
    private String senha;

    private Genero genero;

    @Min(0)
    @Max(200)
    private Integer idade;
}

