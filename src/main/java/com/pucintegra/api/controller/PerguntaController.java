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

@RestController
@RequestMapping("/api")
public class PerguntaController {

    @Autowired
    private PerguntaRepository perguntaRepository;

    @Autowired
    private RespostaRepository respostaRepository;

    @Autowired
    private ReacaoRepository reacaoRepository;

    // POST: Criar Pergunta
    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(
            @RequestParam("matricula_aluno") String matricula,
            @RequestParam("titulo") String titulo,
            @RequestParam("conteudo") String conteudo,
            @RequestParam("id_disciplina") int idDisciplina,
            @RequestParam(value = "palavras_chave", required = false) String tags,
            @RequestParam(value = "anexos", required = false) List<MultipartFile> anexos) {
        
        try {
            // 1. Salvar a Pergunta Principal
            Pergunta p = new Pergunta();
            p.setMatriculaAluno(matricula);
            p.setTitulo(titulo);
            p.setConteudo(conteudo);
            p.setIdDisciplina(idDisciplina);
            
            // O .save() atualiza o objeto 'p' com o novo ID gerado pelo banco
            Pergunta perguntaSalva = perguntaRepository.save(p);
            Long idPergunta = perguntaSalva.getIdPergunta();

            // 2. Processar Tags (Palavras-Chave)
            if (tags != null && !tags.trim().isEmpty()) {
                String[] listaTags = tags.split(","); // O front manda separado por vírgula
                
                for (String tag : listaTags) {
                    String tagLimpa = tag.trim();
                    if(tagLimpa.isEmpty()) continue;

                    // Verifica se a tag já existe no banco
                    Long idTag = perguntaRepository.findIdPalavraChave(tagLimpa);
                    
                    // Se não existe, cria
                    if (idTag == null) {
                        perguntaRepository.savePalavraChave(tagLimpa);
                        idTag = perguntaRepository.findIdPalavraChave(tagLimpa);
                    }
                    
                    // Vincula a tag (ID) com a pergunta (ID)
                    if (idTag != null) {
                        perguntaRepository.linkPalavraChave(idPergunta, idTag);
                    }
                }
            }

            // 3. Processar Anexos (Arquivos)
            if (anexos != null && !anexos.isEmpty()) {
                String uploadDir = "src/main/resources/static/uploads/"; // Mesmo diretório do Perfil
                
                for (MultipartFile file : anexos) {
                    if (file.isEmpty()) continue;

                    // Gera nome único para não sobrescrever (UUID + nome original)
                    String nomeArquivo = UUID.randomUUID().toString().substring(0,8) + "_" + file.getOriginalFilename();
                    Path path = Paths.get(uploadDir + nomeArquivo);
                    
                    // Salva arquivo físico na pasta
                    Files.createDirectories(path.getParent());
                    Files.write(path, file.getBytes());

                    // Salva referência no Banco de Dados
                    String caminhoWeb = "/uploads/" + nomeArquivo;
                    perguntaRepository.saveAnexo(idPergunta, file.getOriginalFilename(), caminhoWeb, file.getContentType());
                }
            }

            return ResponseEntity.ok(perguntaSalva);
            
        } catch (Exception e) {
            e.printStackTrace(); // Ajuda a ver o erro no console
            return ResponseEntity.badRequest().body(Map.of("message", "Erro ao criar pergunta: " + e.getMessage()));
        }
    }
    
    @GetMapping("/users/{matricula}/questions")
    public ResponseEntity<?> getUserQuestions(@PathVariable String matricula) {
        List<Pergunta> lista = perguntaRepository.findByMatriculaAluno(matricula);
        return ResponseEntity.ok(lista);
    }
    
    @GetMapping("/users/{matricula}/answers")
    public ResponseEntity<?> getUserAnswers(@PathVariable String matricula) {
        List<Resposta> lista = respostaRepository.findByMatriculaPessoa(matricula);
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/questions/{id}/answers")
    public ResponseEntity<?> getAnswersByQuestion(
            @PathVariable Long id,
            @RequestParam(required = false) String matriculaUsuario
    ) {
        List<Resposta> respostas = respostaRepository.findByIdPergunta(id);
        List<com.pucintegra.api.dto.RespostaFeedDTO> dtos = new java.util.ArrayList<>();

        for (Resposta r : respostas) {
            Long likes = reacaoRepository.countByIdRespostaAndTipoReacao(r.getIdResposta(), "LIKE");
            Long dislikes = reacaoRepository.countByIdRespostaAndTipoReacao(r.getIdResposta(), "DISLIKE");

            String minhaReacao = null;
            if (matriculaUsuario != null) {
                var reacaoOpt = reacaoRepository.findByIdRespostaAndMatriculaPessoa(r.getIdResposta(), matriculaUsuario);
                if (reacaoOpt.isPresent()) {
                    minhaReacao = reacaoOpt.get().getTipoReacao();
                }
            }

            dtos.add(new com.pucintegra.api.dto.RespostaFeedDTO(
                r.getIdResposta(),
                r.getConteudo(),
                r.getDataCriacao(),
                r.getMatriculaPessoa(),
                likes,
                dislikes,
                minhaReacao
            ));
        }
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        return perguntaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}