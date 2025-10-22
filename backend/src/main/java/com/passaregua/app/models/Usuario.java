package com.passaregua.app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios", uniqueConstraints = {
        @UniqueConstraint(name = "uk_usuarios_email", columnNames = {"email"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "primeiro_nome", nullable = false, length = 100)
    private String primeiroNome;

    @Column(name = "ultimo_nome", nullable = false, length = 100)
    private String ultimoNome;

    @Email
    @Column(name = "email", length = 150)
    private String email;

    @Column(name = "celular", length = 30)
    private String celular;

    @Column(name = "senha", length = 255)
    private String senha;

    @Column(name = "hash_senha", length = 255)
    private String hashSenha;

    @Enumerated(EnumType.STRING)
    @Column(name = "genero", length = 30)
    private Genero genero;

    @Column(name = "idade")
    private Integer idade;

    @Enumerated(EnumType.STRING)
    @Column(name = "two_factor_method", length = 20)
    private TwoFactorMethod twoFactorMethod;

    @Column(name = "two_factor_code", length = 10)
    private String twoFactorCode;

    @Column(name = "two_factor_expires_at")
    private LocalDateTime twoFactorExpiresAt;

    @Column(name = "two_factor_verified")
    private Boolean twoFactorVerified;
}
