// Banco de dados de exercícios com vídeos demonstrativos
// Cada exercício inclui: nome, músculos, vídeo, descrição, técnica

export const exercises = {
  chest: [
    {
      id: 'chest-001',
      name: 'Supino Reto',
      nameEn: 'Bench Press',
      muscles: ['Peitoral Maior', 'Tríceps', 'Deltoide Anterior'],
      sets: 4,
      reps: '8-12',
      rest: '60-90s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=VmB1UN1oIPo',
      thumbnail: 'https://img.youtube.com/vi/VmB1UN1oIPo/mqdefault.jpg',
      description: 'O supino reto é o exercício fundamental para desenvolvimento do peitoral. Deite-se no banco com os pés firmes no chão.',
      tips: [
        'Mantenha as escápulas retraídas durante todo o movimento',
        'Desça a barra até tocar levemente o peito',
        'Empurre explosivamente na subida'
      ],
      videoEmbed: 'https://www.youtube.com/embed/VmB1UN1oIPo'
    },
    {
      id: 'chest-002',
      name: 'Supino Inclinado',
      nameEn: 'Incline Bench Press',
      muscles: ['Peitoral Superior', 'Tríceps', 'Deltoide Anterior'],
      sets: 3,
      reps: '10-12',
      rest: '60-90s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=9BC9qH4tDg4',
      thumbnail: 'https://img.youtube.com/vi/9BC9qH4tDg4/mqdefault.jpg',
      description: 'O supino inclinado enfatiza a porção superior do peitoral. A inclinação deve ser de 30-45 graus.',
      tips: [
        'Não use inclinação excessiva (isso transfere para o deltoide)',
        'Mantenha o controle na fase excêntrica',
        'Contraia o peitoral no topo do movimento'
      ],
      videoEmbed: 'https://www.youtube.com/embed/9BC9qH4tDg4'
    },
    {
      id: 'chest-003',
      name: 'Crucifixo / Fly',
      nameEn: 'Chest Fly',
      muscles: ['Peitoral Maior', 'Peitoral Menor'],
      sets: 3,
      reps: '12-15',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=M8bFj-JbnUI',
      thumbnail: 'https://img.youtube.com/vi/M8bFj-JbnUI/mqdefault.jpg',
      description: 'O crucifixo é um exercício de isolamento que foca no alongamento e contração do peitoral.',
      tips: [
        'Mantenha uma leve flexão nos cotovelos',
        'Sinta o alongamento máximo no peito',
        'Não use peso excessivo - foque na técnica'
      ],
      videoEmbed: 'https://www.youtube.com/embed/M8bFj-JbnUI'
    },
    {
      id: 'chest-004',
      name: 'Crossover na Polia',
      nameEn: 'Cable Crossover',
      muscles: ['Peitoral Maior', 'Peitoral Menor'],
      sets: 3,
      reps: '12-15',
      rest: '45-60s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=SLbDBu8sb0M',
      thumbnail: 'https://img.youtube.com/vi/SLbDBu8sb0M/mqdefault.jpg',
      description: 'O crossover na polia proporciona tensão constante durante todo o movimento.',
      tips: [
        'Mantenha o core engajado',
        'Cruze as mãos no final do movimento',
        'Controle a fase excêntrica'
      ],
      videoEmbed: 'https://www.youtube.com/embed/SLbDBu8sb0M'
    },
    {
      id: 'chest-005',
      name: 'Flexão de Braço',
      nameEn: 'Push-up',
      muscles: ['Peitoral Maior', 'Tríceps', 'Deltoide', 'Core'],
      sets: 3,
      reps: '15-20',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
      thumbnail: 'https://img.youtube.com/vi/IODxDxX7oi4/mqdefault.jpg',
      description: 'A flexão é um exercício básico e eficaz que pode ser feito em qualquer lugar.',
      tips: [
        'Mantenha o corpo em linha reta',
        'Desça até o peito quase tocar o chão',
        'Contraia o core durante todo o movimento'
      ],
      videoEmbed: 'https://www.youtube.com/embed/IODxDxX7oi4'
    }
  ],
  triceps: [
    {
      id: 'tri-001',
      name: 'Tríceps Corda',
      nameEn: 'Rope Pushdown',
      muscles: ['Tríceps (Cabeça Lateral e Medial)'],
      sets: 4,
      reps: '12-15',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=8rZFBbDVJxc',
      thumbnail: 'https://img.youtube.com/vi/8rZFBbDVJxc/mqdefault.jpg',
      description: 'O tríceps corda é excelente para isolamento da cabeça lateral do tríceps.',
      tips: [
        'Mantenha os cotovelos junto ao corpo',
        'Abra a corda no final do movimento',
        'Evite usar o corpo para gerar impulso'
      ],
      videoEmbed: 'https://www.youtube.com/embed/8rZFBbDVJxc'
    },
    {
      id: 'tri-002',
      name: 'Tríceps Testa',
      nameEn: 'Skull Crusher',
      muscles: ['Tríceps (Todas as Cabeças)'],
      sets: 3,
      reps: '10-12',
      rest: '60-90s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=HqMnDRgEIGg',
      thumbnail: 'https://img.youtube.com/vi/HqMnDRgEIGg/mqdefault.jpg',
      description: 'O tríceps testa é um dos melhores exercícios para massa do tríceps.',
      tips: [
        'Mantenha os cotovertos fixos durante o movimento',
        'Desça a barra até a testa',
        'Use amplitude completa de movimento'
      ],
      videoEmbed: 'https://www.youtube.com/embed/HqMnDRgEIGg'
    },
    {
      id: 'tri-003',
      name: 'Tríceps Francês',
      nameEn: 'Overhead Extension',
      muscles: ['Tríceps (Cabeça Longa)'],
      sets: 3,
      reps: '10-12',
      rest: '60s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=8rfFRctM4AY',
      thumbnail: 'https://img.youtube.com/vi/8rfFRctM4AY/mqdefault.jpg',
      description: 'O tríceps francês enfatiza a cabeça longa do tríceps devido ao alongamento.',
      tips: [
        'Mantenha o core engajado',
        'Não arque as costas',
        'Sinta o alongamento máximo'
      ],
      videoEmbed: 'https://www.youtube.com/embed/8rfFRctM4AY'
    },
    {
      id: 'tri-004',
      name: 'Tríceps Banco',
      nameEn: 'Bench Dips',
      muscles: ['Tríceps', 'Peitoral Inferior'],
      sets: 3,
      reps: '12-15',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=6kPA3cZ9N1Y',
      thumbnail: 'https://img.youtube.com/vi/6kPA3cZ9N1Y/mqdefault.jpg',
      description: 'As imersões no banco são um exercício eficaz e acessível para tríceps.',
      tips: [
        'Mantenha os pés firmes no chão',
        'Desça controladamente',
        'Não abra excessivamente os cotovelos'
      ],
      videoEmbed: 'https://www.youtube.com/embed/6kPA3cZ9N1Y'
    }
  ],
  back: [
    {
      id: 'back-001',
      name: 'Barra Fixa',
      nameEn: 'Pull-up',
      muscles: ['Latíssimo do Dorsal', 'Bíceps', 'Trapézio'],
      sets: 3,
      reps: '8-12',
      rest: '60-90s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=eGo4klYlGg7',
      thumbnail: 'https://img.youtube.com/vi/eGo4klYlGg7/mqdefault.jpg',
      description: 'A barra fixa é o exercício supremo para desenvolvimento do dorsal.',
      tips: [
        'Use pegada pronada (palmas para frente)',
        'Puxe até o queixo passar da barra',
        'Controle a descida'
      ],
      videoEmbed: 'https://www.youtube.com/embed/eGo4klYlGg7'
    },
    {
      id: 'back-002',
      name: 'Pulley Frente',
      nameEn: 'Lat Pulldown',
      muscles: ['Latíssimo do Dorsal', 'Redondo Maior', 'Bíceps'],
      sets: 4,
      reps: '10-12',
      rest: '60-90s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=CAq7JHNyNQ8',
      thumbnail: 'https://img.youtube.com/vi/CAq7JHNyNQ8/mqdefault.jpg',
      description: 'O pulley frente é excelente para quem está começando a treinar costas.',
      tips: [
        'Puxe a barra até o peito',
        'Mantenha o tronco estável',
        'Foque em contrair o dorsal'
      ],
      videoEmbed: 'https://www.youtube.com/embed/CAq7JHNyNQ8'
    },
    {
      id: 'back-003',
      name: 'Remada Curvada',
      nameEn: 'Bent Over Row',
      muscles: ['Latíssimo do Dorsal', 'Trapézio', 'Rombóide', 'Bíceps'],
      sets: 4,
      reps: '8-12',
      rest: '60-90s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=LOoH2qYC-2E',
      thumbnail: 'https://img.youtube.com/vi/LOoH2qYC-2E/mqdefault.jpg',
      description: 'A remada curvada constrói espessura e densidade nas costas.',
      tips: [
        'Mantenha a coluna neutra',
        'Puxe o peso até o abdômen',
        'Contraia as escápulas'
      ],
      videoEmbed: 'https://www.youtube.com/embed/LOoH2qYC-2E'
    },
    {
      id: 'back-004',
      name: 'Remada Sentada',
      nameEn: 'Seated Row',
      muscles: ['Latíssimo do Dorsal', 'Trapézio', 'Rombóide'],
      sets: 3,
      reps: '10-12',
      rest: '60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=Tj3nsws2V1U',
      thumbnail: 'https://img.youtube.com/vi/Tj3nsws2V1U/mqdefault.jpg',
      description: 'A remada sentada é excelente para desenvolvimento da espessura do dorsal.',
      tips: [
        'Mantenha o peito aberto',
        'Puxe até o abdômen',
        'Contraia as escápulas no final'
      ],
      videoEmbed: 'https://www.youtube.com/embed/Tj3nsws2V1U'
    },
    {
      id: 'back-005',
      name: 'Levantamento Terra',
      nameEn: 'Deadlift',
      muscles: ['Eretores da Espinha', 'Glúteos', 'Trapézio', 'Antebraço'],
      sets: 3,
      reps: '5-8',
      rest: '90-120s',
      difficulty: 'avançado',
      videoUrl: 'https://www.youtube.com/watch?v=uklF2DfM08Y',
      thumbnail: 'https://img.youtube.com/vi/uklF2DfM08Y/mqdefault.jpg',
      description: 'O terra é um dos exercícios mais completos do treinamento de força.',
      tips: [
        'Mantenha a barra próxima ao corpo',
        'Engaje o core antes de levantar',
        'Use técnica adequada para prevenir lesões'
      ],
      videoEmbed: 'https://www.youtube.com/embed/uklF2DfM08Y'
    }
  ],
  biceps: [
    {
      id: 'bicep-001',
      name: 'Rosca Direta',
      nameEn: 'Barbell Curl',
      muscles: ['Bíceps Braquial', 'Braquial'],
      sets: 4,
      reps: '8-12',
      rest: '60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0H0',
      thumbnail: 'https://img.youtube.com/vi/ykJmrZ5v0H0/mqdefault.jpg',
      description: 'A rosca direta é o exercício clássico para desenvolvimento do bíceps.',
      tips: [
        'Mantenha os cotovelos fixos',
        'Não use impulso do corpo',
        'Contraia o bíceps no topo'
      ],
      videoEmbed: 'https://www.youtube.com/embed/ykJmrZ5v0H0'
    },
    {
      id: 'bicep-002',
      name: 'Rosca Martelo',
      nameEn: 'Hammer Curl',
      muscles: ['Bíceps', 'Braquial', 'Antebraço'],
      sets: 3,
      reps: '10-12',
      rest: '60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=2rdJNg7uw24',
      thumbnail: 'https://img.youtube.com/vi/2rdJNg7uw24/mqdefault.jpg',
      description: 'A rosca martelo enfatiza o braquial e desenvolve a espessura do braço.',
      tips: [
        'Mantenha a pegada neutra (palmas se olhando)',
        'Controle a fase excêntrica',
        'Não balance o corpo'
      ],
      videoEmbed: 'https://www.youtube.com/embed/2rdJNg7uw24'
    },
    {
      id: 'bicep-003',
      name: 'Rosca Scott',
      nameEn: 'Preacher Curl',
      muscles: ['Bíceps Braquial'],
      sets: 3,
      reps: '10-12',
      rest: '60s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=9Mqlo_VmlHk',
      thumbnail: 'https://img.youtube.com/vi/9Mqlo_VmlHk/mqdefault.jpg',
      description: 'A rosca scott isola o bíceps e elimina o uso de impulso.',
      tips: [
        'Mantenha o peito contra o banco',
        'Use amplitude completa',
        'Contraia fortemente no topo'
      ],
      videoEmbed: 'https://www.youtube.com/embed/9Mqlo_VmlHk'
    },
    {
      id: 'bicep-004',
      name: 'Rosca Concentrada',
      nameEn: 'Concentration Curl',
      muscles: ['Bíceps (Pico)'],
      sets: 3,
      reps: '12-15',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=8EuOHL39g2g',
      thumbnail: 'https://img.youtube.com/vi/8EuOHL39g2g/mqdefault.jpg',
      description: 'A rosca concentrada é excelente para desenvolver o pico do bíceps.',
      tips: [
        'Mantenha o cotovelo apoiado na perna',
        'Foque na contração máxima',
        'Use peso moderado para técnica perfeita'
      ],
      videoEmbed: 'https://www.youtube.com/embed/8EuOHL39g2g'
    }
  ],
  legs: [
    {
      id: 'legs-001',
      name: 'Agachamento Livre',
      nameEn: 'Back Squat',
      muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais', 'Core'],
      sets: 4,
      reps: '8-12',
      rest: '90-120s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=swU33b5O1ZA',
      thumbnail: 'https://img.youtube.com/vi/swU33b5O1ZA/mqdefault.jpg',
      description: 'O agachamento é o rei dos exercícios para membros inferiores.',
      tips: [
        'Mantenha os pés na largura dos ombros',
        'Desça até paralela ou abaixo',
        'Mantenha o core engajado'
      ],
      videoEmbed: 'https://www.youtube.com/embed/swU33b5O1ZA'
    },
    {
      id: 'legs-002',
      name: 'Leg Press 45°',
      nameEn: 'Leg Press',
      muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
      sets: 4,
      reps: '10-15',
      rest: '60-90s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=IZXYyWjPvKs',
      thumbnail: 'https://img.youtube.com/vi/IZXYyWjPvKs/mqdefault.jpg',
      description: 'O leg press permite usar carga elevada com menor risco que o agachamento.',
      tips: [
        'Não bloqueie os joelhos no topo',
        'Desça com controle',
        'Mantenha os pés firmes na plataforma'
      ],
      videoEmbed: 'https://www.youtube.com/embed/IZXYyWjPvKs'
    },
    {
      id: 'legs-003',
      name: 'Cadeira Extensora',
      nameEn: 'Leg Extension',
      muscles: ['Quadríceps'],
      sets: 3,
      reps: '12-15',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=1bmu4vfg09o',
      thumbnail: 'https://img.youtube.com/vi/1bmu4vfg09o/mqdefault.jpg',
      description: 'A extensora isola o quadríceps e é excelente para definição.',
      tips: [
        'Contraia no topo do movimento',
        'Controle a fase excêntrica',
        'Não use impulso'
      ],
      videoEmbed: 'https://www.youtube.com/embed/1bmu4vfg09o'
    },
    {
      id: 'legs-004',
      name: 'Mesa Flexora',
      nameEn: 'Leg Curl',
      muscles: ['Isquiotibiais'],
      sets: 3,
      reps: '12-15',
      rest: '60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=7dWPM9clPhM',
      thumbnail: 'https://img.youtube.com/vi/7dWPM9clPhM/mqdefault.jpg',
      description: 'A mesa flexora isola os isquiotibiais e complementa o treino de pernas.',
      tips: [
        'Contraia os isquiotibiais no topo',
        'Mantenha o tronco estável',
        'Use amplitude completa'
      ],
      videoEmbed: 'https://www.youtube.com/embed/7dWPM9clPhM'
    },
    {
      id: 'legs-005',
      name: 'Elevação Pélvica',
      nameEn: 'Hip Thrust',
      muscles: ['Glúteos Máximo', 'Isquiotibiais'],
      sets: 4,
      reps: '10-12',
      rest: '60-90s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=8Dyl1dTrM1M',
      thumbnail: 'https://img.youtube.com/vi/8Dyl1dTrM1M/mqdefault.jpg',
      description: 'O hip thrust é o melhor exercício para ativação dos glúteos.',
      tips: [
        'Contraia os glúteos no topo',
        'Mantenha o queixo junto ao peito',
        'Use amplitude completa'
      ],
      videoEmbed: 'https://www.youtube.com/embed/8Dyl1dTrM1M'
    },
    {
      id: 'legs-006',
      name: 'Panturrilha Sentado',
      nameEn: 'Seated Calf Raise',
      muscles: ['Soleo'],
      sets: 4,
      reps: '15-20',
      rest: '45s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=8H1PEBfRxaU',
      thumbnail: 'https://img.youtube.com/vi/8H1PEBfRxaU/mqdefault.jpg',
      description: 'A panturrilha sentada enfatiza o sóleo, músculo importante da parte inferior.',
      tips: [
        'Use amplitude completa',
        'Contraia no topo',
        'Mantenha o movimento controlado'
      ],
      videoEmbed: 'https://www.youtube.com/embed/8H1PEBfRxaU'
    }
  ],
  shoulders: [
    {
      id: 'shoulder-001',
      name: 'Desenvolvimento',
      nameEn: 'Overhead Press',
      muscles: ['Deltoide', 'Tríceps', 'Trapézio'],
      sets: 4,
      reps: '8-12',
      rest: '60-90s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=2yj3XTUejyI',
      thumbnail: 'https://img.youtube.com/vi/2yj3XTUejyI/mqdefault.jpg',
      description: 'O desenvolvimento é o exercício fundamental para ombros.',
      tips: [
        'Mantenha o core engajado',
        'Não arque as costas',
        'Use amplitude completa'
      ],
      videoEmbed: 'https://www.youtube.com/embed/2yj3XTUejyI'
    },
    {
      id: 'shoulder-002',
      name: 'Elevação Lateral',
      nameEn: 'Lateral Raise',
      muscles: ['Deltoide Lateral'],
      sets: 3,
      reps: '12-15',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=X67tF2a8oX8',
      thumbnail: 'https://img.youtube.com/vi/X67tF2a8oX8/mqdefault.jpg',
      description: 'A elevação lateral isola o deltoide lateral para ombros mais largos.',
      tips: [
        'Levante até a altura dos ombros',
        'Mantenha leve flexão nos cotovelos',
        'Use peso moderado'
      ],
      videoEmbed: 'https://www.youtube.com/embed/X67tF2a8oX8'
    },
    {
      id: 'shoulder-003',
      name: 'Elevação Frontal',
      nameEn: 'Front Raise',
      muscles: ['Deltoide Anterior'],
      sets: 3,
      reps: '12-15',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=Y_Rq1oC9J58',
      thumbnail: 'https://img.youtube.com/vi/Y_Rq1oC9J58/mqdefault.jpg',
      description: 'A elevação frontal enfatiza o deltoide anterior.',
      tips: [
        'Levante até a altura dos ombros',
        'Controle a descida',
        'Não use impulso do corpo'
      ],
      videoEmbed: 'https://www.youtube.com/embed/Y_Rq1oC9J58'
    },
    {
      id: 'shoulder-004',
      name: 'Face Pull',
      nameEn: 'Face Pull',
      muscles: ['Deltoide Posterior', 'Trapézio', 'Rombóide'],
      sets: 3,
      reps: '15-20',
      rest: '45-60s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=8Dyl1dTrM1M',
      thumbnail: 'https://img.youtube.com/vi=8Dyl1dTrM1M/mqdefault.jpg',
      description: 'O face pull é excelente para saúde dos ombros e postura.',
      tips: [
        'Puxe a corda até a face',
        'Contraia as escápulas',
        'Mantenha os cotovelos altos'
      ],
      videoEmbed: 'https://www.youtube.com/embed/8Dyl1dTrM1M'
    }
  ],
  core: [
    {
      id: 'core-001',
      name: 'Prancha',
      nameEn: 'Plank',
      muscles: ['Retos Abdominais', 'Transverso', 'Oblíquos'],
      sets: 3,
      reps: '30-60s',
      rest: '30-45s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=pSHkTRbRwe1',
      thumbnail: 'https://img.youtube.com/vi/pSHkTRbRwe1/mqdefault.jpg',
      description: 'A prancha é um exercício isométrico fundamental para o core.',
      tips: [
        'Mantenha o corpo em linha reta',
        'Engaje o core',
        'Não deixe o quadril cair'
      ],
      videoEmbed: 'https://www.youtube.com/embed/pSHkTRbRwe1'
    },
    {
      id: 'core-002',
      name: 'Abdominal Supra',
      nameEn: 'Crunch',
      muscles: ['Retos Abdominais'],
      sets: 3,
      reps: '15-20',
      rest: '30-45s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=XydFA5llkhE',
      thumbnail: 'https://img.youtube.com/vi/XydFA5llkhE/mqdefault.jpg',
      description: 'O abdominal supra é o exercício clássico para abdominais.',
      tips: [
        'Contraia o abdominal no topo',
        'Não use impulso',
        'Mantenha o movimento controlado'
      ],
      videoEmbed: 'https://www.youtube.com/embed/XydFA5llkhE'
    },
    {
      id: 'core-003',
      name: 'Abdominal Infra',
      nameEn: 'Leg Raise',
      muscles: ['Abdominais Inferiores'],
      sets: 3,
      reps: '12-15',
      rest: '30-45s',
      difficulty: 'intermediário',
      videoUrl: 'https://www.youtube.com/watch?v=jbUy0C5XLuM',
      thumbnail: 'https://img.youtube.com/vi/jbUy0C5XLuM/mqdefault.jpg',
      description: 'O abdominal infra enfatiza a porção inferior dos abdominais.',
      tips: [
        'Mantenha as pernas esticadas',
        'Levante até 90 graus',
        'Controle a descida'
      ],
      videoEmbed: 'https://www.youtube.com/embed/jbUy0C5XLuM'
    },
    {
      id: 'core-004',
      name: 'Russian Twist',
      nameEn: 'Russian Twist',
      muscles: ['Oblíquos', 'Transverso'],
      sets: 3,
      reps: '20-30',
      rest: '30-45s',
      difficulty: 'iniciante',
      videoUrl: 'https://www.youtube.com/watch?v=8JdJe5rX2KE',
      thumbnail: 'https://img.youtube.com/vi/8JdJe5rX2KE/mqdefault.jpg',
      description: 'O russian twist é excelente para oblíquos e rotação do core.',
      tips: [
        'Mantenha os pés elevados',
        'Gire o tronco completamente',
        'Engaje o core durante todo o movimento'
      ],
      videoEmbed: 'https://www.youtube.com/embed/8JdJe5rX2KE'
    }
  ]
};

// Funções utilitárias
export const getExerciseById = (id) => {
  for (const [category, exercisesList] of Object.entries(exercises)) {
    const exercise = exercisesList.find(e => e.id === id);
    if (exercise) return exercise;
  }
  return null;
};

export const getExercisesByMuscle = (muscle) => {
  const result = [];
  for (const [category, exercisesList] of Object.entries(exercises)) {
    const filtered = exercisesList.filter(e =>
      e.muscles.some(m => m.toLowerCase().includes(muscle.toLowerCase()))
    );
    result.push(...filtered);
  }
  return result;
};

export const getExercisesByDifficulty = (difficulty) => {
  const result = [];
  for (const [category, exercisesList] of Object.entries(exercises)) {
    const filtered = exercisesList.filter(e => e.difficulty === difficulty);
    result.push(...filtered);
  }
  return result;
};

export const getAllExercises = () => {
  return Object.values(exercises).flat();
};
