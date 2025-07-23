<?php
session_start();
include 'conexao.php';

$id_empresa = $_SESSION['id_empresa']; // supondo que você armazene o ID da empresa na sessão

// Consulta todas as vagas da empresa com seus candidatos
$sql = "
SELECT 
    v.id_vaga, v.titulo,
    u.nome AS nome_candidato,
    c.id_candidatura,
    c.status,
    curr.arquivo_curriculo
FROM vaga v
LEFT JOIN candidatura c ON v.id_vaga = c.id_vaga
LEFT JOIN usuario u ON c.id_usuario = u.id_usuario
LEFT JOIN curriculo curr ON curr.id_usuario = u.id_usuario
WHERE v.id_empresa = ?
ORDER BY v.id_vaga DESC, u.nome ASC
";

$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $id_empresa);
$stmt->execute();
$result = $stmt->get_result();

// Agrupa por vaga
$vagas = [];
while ($row = $result->fetch_assoc()) {
    $vagas[$row['id_vaga']]['titulo'] = $row['titulo'];
    $vagas[$row['id_vaga']]['candidatos'][] = [
        'id_candidatura' => $row['id_candidatura'],
        'nome' => $row['nome_candidato'],
        'curriculo' => $row['arquivo_curriculo'],
        'status' => $row['status']
    ];
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil da Empresa</title>
    <link rel="stylesheet" href="css/perfil_empresa.css">
</head>

<body>

     <!-- Header -->
     <header class="header">
        <div class="container">
            <!-- Navigation Menu -->
            <nav>
                <ul class="nav-menu" id="navMenu">
                    <li class="nav-item">
                        <a href="dashboard.html" class="nav-link" data-section="dashboard">Dashboard</a>
                    </li>
                </ul>
                
                <!--
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    ☰
                </button>
            -->
     
            </nav>

            <!-- Logo -->
            <div class="logo-container" onclick="goHome()">
                
                <img src="img/logo.png" alt="Tech Talents Logo" class="logo-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                
                <!-- Texto de fallback caso a imagem não carregue -->
                <span class="logo-text">TECH TALENTS</span>
            </div>

        </div>
    </header>

<!-- Vagas  -->

<main>
<div class="vagas-container">
    <?php foreach ($vagas as $id_vaga => $vaga): ?>
    <div class="vaga">
        <h2><?= htmlspecialchars($vaga['titulo']) ?></h2>
        
        <?php if (!empty($vaga['candidatos'])): ?>
    
        <?php foreach ($vaga['candidatos'] as $cand): ?>
            
            <div class="candidato"> 
                <strong><?= htmlspecialchars($cand['nome']) ?></strong>

                <form method="post" action="atualizar_status.php"> 
                    
                    <input class= "vaga" type="hidden" name="id_candidatura" value="<?= $cand['id_candidatura'] ?>">
                    
                    <select class= "btn-status" name="status">
                        <option value="Em análise" <?= $cand['status'] == 'Em análise' ? 'selected' : '' ?>>Em análise</option>
                        <option value="Aprovado" <?= $cand['status'] == 'Aprovado' ? 'selected' : '' ?>>Aprovado</option>
                        <option value="Reprovado" <?= $cand['status'] == 'Reprovado' ? 'selected' : '' ?>>Reprovado</option>
                    </select>
                    
                    <button class= "btn-salvar" type="submit">Salvar</button>
                
                </form>

                <?php
                $caminho = $cand['curriculo'];
                if (!empty($caminho)) {
                    $caminho_relativo = htmlspecialchars($caminho);
                    $caminho_fisico = __DIR__ . '/' . $caminho;
                if (file_exists($caminho_fisico)) {
                    echo "<a href='{$caminho_relativo}' target='_blank' download> Baixar currículo</a>";
                } else {
                    echo "<span style='color: gray;'>Arquivo não encontrado</span>";
                }
                } else {
                echo "<span style='color: gray;'>Sem currículo</span>";
                }
                ?>

                <?php endforeach; ?>
    
                <?php else: ?>
                    <p>Nenhum candidato nesta vaga.</p>
                <?php endif; ?>
                <?php endforeach; ?>
    </div> 
</main>    
    
    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-column">
                    <h4>Sou</h4>
                    <ul>
                        <li><a href="#">Minhas Candidaturas</a></li>
                        <li><a href="#">Currículo</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Empresa</h4>
                    <ul>
                        <li><a href="#">Vagas</a></li>
                        <li><a href="../View/pgteste.html">Testes</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-logo">
                     <img src="../IMG/logo.png" alt="Tech Talents Logo" class="logo-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                
                </div>
                <div class="footer-info">
                    © 2023 Talentos. All rights reserved. | Privacy Policy | Terms of Service
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
