package com.passaregua.app.dtos.auth;

import com.passaregua.app.models.TwoFactorMethod;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendCodeRequest {
    @NotNull
    private Long usuarioId;

    @NotNull
    private TwoFactorMethod method;
}

