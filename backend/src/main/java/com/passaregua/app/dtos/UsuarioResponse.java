package com.passaregua.app.dtos;

import com.passaregua.app.models.Genero;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponse {
    private Long id;
    private String primeiroNome;
    private String ultimoNome;
    private String email;
    private String celular;
    private Genero genero;
    private Integer idade;
}

