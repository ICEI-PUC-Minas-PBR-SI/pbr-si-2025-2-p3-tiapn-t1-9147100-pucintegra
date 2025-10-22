package com.passaregua.app.dtos.auth;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyCodeRequest {
    @NotNull
    private Long usuarioId;

    @NotBlank
    private String code;
}

