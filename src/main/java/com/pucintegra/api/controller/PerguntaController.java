package com.pucintegra.api.controller;

import com.pucintegra.api.model.Pergunta;
import com.pucintegra.api.model.Resposta;
import com.pucintegra.api.repository.PerguntaRepository;
import com.pucintegra.api.repository.RespostaRepository;
import com.pucintegra.api.repository.ReacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class PerguntaController {

    @Autowired
    private PerguntaRepository perguntaRepository;

    @Autowired
    private RespostaRepository respostaRepository;

    @Autowired
    private ReacaoRepository reacaoRepository;

    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(
            @RequestParam("matricula_aluno") String matricula,
            @RequestParam("titulo") String titulo,
            @RequestParam("conteudo") String conteudo,
            @RequestParam("id_disciplina") int idDisciplina,
            @RequestParam(value = "palavras_chave", required = false) String tags,
            @RequestParam(value = "anexos", required = false) List<MultipartFile> anexos) {
        
        try {
            // 1. Cria o objeto
            Pergunta p = new Pergunta();
            p.setMatriculaAluno(matricula);
            p.setTitulo(titulo);
            p.setConteudo(conteudo);
            p.setIdDisciplina(idDisciplina);
            
            // CORREÇÃO ESSENCIAL: saveAndFlush obriga o banco a gerar o ID AGORA.
            Pergunta perguntaSalva = perguntaRepository.saveAndFlush(p);
            Long idPergunta = perguntaSalva.getIdPergunta();

            // 2. Salva Tags
            if (tags != null && !tags.trim().isEmpty()) {
                String[] listaTags = tags.split(","); 
                for (String tag : listaTags) {
                    String tagLimpa = tag.trim();
                    if(tagLimpa.isEmpty()) continue;

                    Long idTag = perguntaRepository.findIdPalavraChave(tagLimpa);
                    if (idTag == null) {
                        perguntaRepository.savePalavraChave(tagLimpa);
                        idTag = perguntaRepository.findIdPalavraChave(tagLimpa);
                    }
                    if (idTag != null) {
                        perguntaRepository.linkPalavraChave(idPergunta, idTag);
                    }
                }
            }

            // 3. Salva Anexos
            if (anexos != null && !anexos.isEmpty()) {
                // No Render, usamos uma pasta temporária ou relativa, pois 'src' não é editável no JAR
                String uploadDir = "uploads/"; 
                Files.createDirectories(Paths.get(uploadDir));
                
                for (MultipartFile file : anexos) {
                    if (file.isEmpty()) continue;

                    String nomeArquivo = UUID.randomUUID().toString().substring(0,8) + "_" + file.getOriginalFilename();
                    Path path = Paths.get(uploadDir + nomeArquivo);
                    
                    Files.write(path, file.getBytes());

                    // Salva referência com barra inicial para a URL web
                    String caminhoWeb = "/uploads/" + nomeArquivo;
                    perguntaRepository.saveAnexo(idPergunta, file.getOriginalFilename(), caminhoWeb, file.getContentType());
                }
            }

            return ResponseEntity.ok(perguntaSalva);
            
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.badRequest().body(Map.of("message", "Erro ao criar pergunta: " + e.getMessage()));
        }
    }
    
    // --- MÉTODOS DE LEITURA (Mantidos) ---
    @GetMapping("/users/{matricula}/questions")
    public ResponseEntity<?> getUserQuestions(@PathVariable String matricula) {
        return ResponseEntity.ok(perguntaRepository.findByMatriculaAluno(matricula));
    }
    
    @GetMapping("/users/{matricula}/answers")
    public ResponseEntity<?> getUserAnswers(@PathVariable String matricula) {
        return ResponseEntity.ok(respostaRepository.findByMatriculaPessoa(matricula));
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        return perguntaRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/questions/{id}/answers")
    public ResponseEntity<?> getAnswersByQuestion(@PathVariable Long id, @RequestParam(required = false) String matriculaUsuario) {
        List<Resposta> respostas = respostaRepository.findByIdPergunta(id);
        List<com.pucintegra.api.dto.RespostaFeedDTO> dtos = new ArrayList<>();

        for (Resposta r : respostas) {
            Long likes = reacaoRepository.countByIdRespostaAndTipoReacao(r.getIdResposta(), "LIKE");
            Long dislikes = reacaoRepository.countByIdRespostaAndTipoReacao(r.getIdResposta(), "DISLIKE");
            String minhaReacao = null;
            if (matriculaUsuario != null) {
                var reacaoOpt = reacaoRepository.findByIdRespostaAndMatriculaPessoa(r.getIdResposta(), matriculaUsuario);
                if (reacaoOpt.isPresent()) minhaReacao = reacaoOpt.get().getTipoReacao();
            }
            dtos.add(new com.pucintegra.api.dto.RespostaFeedDTO(
                r.getIdResposta(), r.getConteudo(), r.getDataCriacao(),
                r.getMatriculaPessoa(), likes, dislikes, minhaReacao
            ));
        }
        return ResponseEntity.ok(dtos);
    }
}