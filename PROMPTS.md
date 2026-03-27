# Exemplos de Prompts para IA

## 1. Geração de Treino

### Prompt Estruturado (Backend)

```
Você é um treinador de musculação experiente. Crie um plano de treino personalizado em JSON.

DADOS DO USUÁRIO:
- Objetivo: hipertrofia
- Nível: intermediário
- Dias por semana: 4
- Duração da sessão: 60 minutos
- Equipamentos disponíveis: barra, halteres, máquinas
- Restrições: Nenhuma

IMPORTANTE: Retorne APENAS um JSON válido, sem explicações extras.

Estrutura esperada:
{
  "title": "Nome do Plano",
  "description": "Descrição breve",
  "objective": "hipertrofia",
  "level": "intermediário",
  "daysPerWeek": 4,
  "totalWeeks": 12,
  "days": [
    {
      "day": "Segunda",
      "focus": "Peito & Tríceps",
      "duration": 60,
      "exercises": [
        {
          "name": "Supino Reto",
          "sets": 4,
          "reps": "8-12",
          "restSeconds": 90,
          "tempo": "3-1-1",
          "notes": "Controle o movimento"
        }
      ]
    }
  ],
  "nutrition": {
    "dailyCalories": 2500,
    "macros": {
      "protein": 180,
      "carbs": 250,
      "fat": 80
    }
  },
  "tips": ["Dica 1", "Dica 2"]
}
```

### Exemplos de Respostas

#### Treino de Hipertrofia (4 dias)
```json
{
  "title": "Plano de Hipertrofia 4 Dias",
  "description": "Focado em ganho de massa muscular com volume moderado",
  "objective": "hipertrofia",
  "level": "intermediário",
  "daysPerWeek": 4,
  "totalWeeks": 12,
  "days": [
    {
      "day": "Segunda",
      "focus": "Peito & Tríceps",
      "duration": 60,
      "exercises": [
        {
          "name": "Supino Reto",
          "sets": 4,
          "reps": "8-12",
          "restSeconds": 90,
          "tempo": "3-1-1",
          "notes": "Controle a descida, explosivo na subida"
        },
        {
          "name": "Supino Inclinado",
          "sets": 3,
          "reps": "10-12",
          "restSeconds": 75,
          "tempo": "3-1-1",
          "notes": "Foco na parte superior do peito"
        },
        {
          "name": "Crucifixo",
          "sets": 3,
          "reps": "12-15",
          "restSeconds": 60,
          "tempo": "2-1-2",
          "notes": "Alongamento máximo"
        },
        {
          "name": "Tríceps Corda",
          "sets": 4,
          "reps": "12-15",
          "restSeconds": 60,
          "tempo": "2-1-1",
          "notes": "Contraia no final do movimento"
        }
      ]
    },
    {
      "day": "Terça",
      "focus": "Costas & Bíceps",
      "duration": 60,
      "exercises": [
        {
          "name": "Puxada Frontal",
          "sets": 4,
          "reps": "8-12",
          "restSeconds": 90,
          "tempo": "2-1-2",
          "notes": "Puxe até o peito"
        },
        {
          "name": "Remada Curvada",
          "sets": 4,
          "reps": "10-12",
          "restSeconds": 90,
          "tempo": "2-1-1",
          "notes": "Cotovelos próximos ao corpo"
        },
        {
          "name": "Rosca Direta",
          "sets": 3,
          "reps": "10-12",
          "restSeconds": 75,
          "tempo": "2-1-1",
          "notes": "Sem balanço"
        }
      ]
    },
    {
      "day": "Quinta",
      "focus": "Pernas",
      "duration": 60,
      "exercises": [
        {
          "name": "Agachamento",
          "sets": 4,
          "reps": "8-10",
          "restSeconds": 120,
          "tempo": "3-1-1",
          "notes": "Profundidade máxima"
        },
        {
          "name": "Leg Press",
          "sets": 3,
          "reps": "10-12",
          "restSeconds": 90,
          "tempo": "2-1-1",
          "notes": "Não tranque os joelhos"
        },
        {
          "name": "Extensão de Pernas",
          "sets": 3,
          "reps": "12-15",
          "restSeconds": 60,
          "tempo": "2-1-2",
          "notes": "Contraia no topo"
        }
      ]
    },
    {
      "day": "Sexta",
      "focus": "Ombros & Trapézio",
      "duration": 60,
      "exercises": [
        {
          "name": "Desenvolvimento",
          "sets": 4,
          "reps": "8-12",
          "restSeconds": 90,
          "tempo": "2-1-1",
          "notes": "Controle a descida"
        },
        {
          "name": "Elevação Lateral",
          "sets": 3,
          "reps": "12-15",
          "restSeconds": 60,
          "tempo": "2-1-2",
          "notes": "Cotovelos ligeiramente flexionados"
        },
        {
          "name": "Encolhimento",
          "sets": 3,
          "reps": "12-15",
          "restSeconds": 60,
          "tempo": "1-2-1",
          "notes": "Máxima contração no topo"
        }
      ]
    }
  ],
  "nutrition": {
    "dailyCalories": 2800,
    "macros": {
      "protein": 200,
      "carbs": 300,
      "fat": 90
    }
  },
  "tips": [
    "Mantenha consistência nos treinos",
    "Durma 7-8 horas por noite",
    "Aumente o peso gradualmente",
    "Faça aquecimento adequado"
  ]
}
```

---

## 2. Geração de Dieta

### Prompt Estruturado (Backend)

```
Você é um nutricionista especializado em musculação. Crie um plano alimentar em JSON.

DADOS DO USUÁRIO:
- Objetivo: ganho_massa
- Calorias diárias: 2800
- Refeições por dia: 5
- Restrições: Nenhuma

IMPORTANTE: Retorne APENAS um JSON válido, sem explicações extras.

Estrutura esperada:
{
  "title": "Plano Alimentar",
  "objective": "ganho_massa",
  "dailyCalories": 2800,
  "macros": {
    "protein": 200,
    "carbs": 300,
    "fat": 90
  },
  "meals": [
    {
      "name": "Café da Manhã",
      "time": "07:00",
      "calories": 500,
      "items": [
        {
          "food": "Ovos",
          "quantity": "3",
          "unit": "unidades",
          "calories": 210,
          "protein": 18,
          "carbs": 2,
          "fat": 15
        }
      ],
      "substitutions": ["Alternativa 1"]
    }
  ],
  "tips": ["Dica 1"],
  "shoppingList": ["Item 1"]
}
```

### Exemplo de Resposta

```json
{
  "title": "Plano Alimentar - Ganho de Massa",
  "objective": "ganho_massa",
  "dailyCalories": 2800,
  "macros": {
    "protein": 200,
    "carbs": 300,
    "fat": 90
  },
  "meals": [
    {
      "name": "Café da Manhã",
      "time": "07:00",
      "calories": 550,
      "items": [
        {
          "food": "Ovos",
          "quantity": "3",
          "unit": "unidades",
          "calories": 210,
          "protein": 18,
          "carbs": 2,
          "fat": 15
        },
        {
          "food": "Pão Integral",
          "quantity": "2",
          "unit": "fatias",
          "calories": 160,
          "protein": 8,
          "carbs": 28,
          "fat": 2
        },
        {
          "food": "Banana",
          "quantity": "1",
          "unit": "unidade",
          "calories": 105,
          "protein": 1,
          "carbs": 27,
          "fat": 0
        },
        {
          "food": "Manteiga de Amendoim",
          "quantity": "1",
          "unit": "colher de sopa",
          "calories": 95,
          "protein": 4,
          "carbs": 3,
          "fat": 8
        }
      ],
      "substitutions": [
        "Trocar ovos por 200g de peito de frango",
        "Trocar pão por aveia"
      ]
    },
    {
      "name": "Lanche da Manhã",
      "time": "10:00",
      "calories": 300,
      "items": [
        {
          "food": "Whey Protein",
          "quantity": "1",
          "unit": "scoop",
          "calories": 120,
          "protein": 25,
          "carbs": 2,
          "fat": 1
        },
        {
          "food": "Maçã",
          "quantity": "1",
          "unit": "unidade",
          "calories": 95,
          "protein": 0,
          "carbs": 25,
          "fat": 0
        },
        {
          "food": "Castanhas",
          "quantity": "30",
          "unit": "gramas",
          "calories": 85,
          "protein": 3,
          "carbs": 3,
          "fat": 8
        }
      ],
      "substitutions": [
        "Trocar whey por iogurte grego",
        "Trocar maçã por laranja"
      ]
    },
    {
      "name": "Almoço",
      "time": "12:30",
      "calories": 900,
      "items": [
        {
          "food": "Peito de Frango",
          "quantity": "200",
          "unit": "gramas",
          "calories": 330,
          "protein": 65,
          "carbs": 0,
          "fat": 7
        },
        {
          "food": "Arroz Integral",
          "quantity": "150",
          "unit": "gramas",
          "calories": 195,
          "protein": 5,
          "carbs": 43,
          "fat": 2
        },
        {
          "food": "Brócolis",
          "quantity": "200",
          "unit": "gramas",
          "calories": 70,
          "protein": 7,
          "carbs": 14,
          "fat": 1
        },
        {
          "food": "Azeite de Oliva",
          "quantity": "1",
          "unit": "colher de sopa",
          "calories": 120,
          "protein": 0,
          "carbs": 0,
          "fat": 14
        },
        {
          "food": "Batata Doce",
          "quantity": "100",
          "unit": "gramas",
          "calories": 86,
          "protein": 2,
          "carbs": 20,
          "fat": 0
        }
      ],
      "substitutions": [
        "Trocar frango por peixe (salmão)",
        "Trocar arroz por batata doce",
        "Trocar brócolis por espinafre"
      ]
    },
    {
      "name": "Lanche da Tarde",
      "time": "15:30",
      "calories": 350,
      "items": [
        {
          "food": "Iogurte Grego",
          "quantity": "200",
          "unit": "gramas",
          "calories": 130,
          "protein": 20,
          "carbs": 8,
          "fat": 2
        },
        {
          "food": "Granola",
          "quantity": "50",
          "unit": "gramas",
          "calories": 220,
          "protein": 6,
          "carbs": 35,
          "fat": 8
        }
      ],
      "substitutions": [
        "Trocar iogurte por cottage",
        "Trocar granola por mel"
      ]
    },
    {
      "name": "Jantar",
      "time": "19:00",
      "calories": 700,
      "items": [
        {
          "food": "Salmão",
          "quantity": "180",
          "unit": "gramas",
          "calories": 320,
          "protein": 35,
          "carbs": 0,
          "fat": 18
        },
        {
          "food": "Batata Doce",
          "quantity": "150",
          "unit": "gramas",
          "calories": 130,
          "protein": 3,
          "carbs": 30,
          "fat": 0
        },
        {
          "food": "Salada Verde",
          "quantity": "200",
          "unit": "gramas",
          "calories": 50,
          "protein": 3,
          "carbs": 10,
          "fat": 0
        },
        {
          "food": "Azeite de Oliva",
          "quantity": "1",
          "unit": "colher de sopa",
          "calories": 120,
          "protein": 0,
          "carbs": 0,
          "fat": 14
        }
      ],
      "substitutions": [
        "Trocar salmão por atum",
        "Trocar batata doce por arroz integral"
      ]
    }
  ],
  "tips": [
    "Beba pelo menos 3 litros de água por dia",
    "Coma a cada 3-4 horas",
    "Priorize proteína em todas as refeições",
    "Ajuste calorias conforme progresso",
    "Suplementos recomendados: Whey, Creatina, Ômega-3"
  ],
  "shoppingList": [
    "Ovos",
    "Peito de Frango",
    "Salmão",
    "Arroz Integral",
    "Batata Doce",
    "Brócolis",
    "Espinafre",
    "Maçã",
    "Banana",
    "Iogurte Grego",
    "Whey Protein",
    "Castanhas",
    "Azeite de Oliva",
    "Pão Integral"
  ]
}
```

---

## 3. Chat Genérico

### Exemplos de Conversas

**Usuário:** "Quero criar um treino para ganhar massa"

**IA:** "Ótimo! Para criar um treino personalizado, preciso saber:

1. **Seu nível**: Você é iniciante, intermediário ou avançado?
2. **Dias por semana**: Quantos dias pode treinar?
3. **Duração**: Quanto tempo tem por sessão?
4. **Equipamentos**: Tem acesso a barra, halteres, máquinas?
5. **Restrições**: Tem alguma lesão ou limitação?

Me conte mais para eu criar o melhor plano para você! 💪"

---

**Usuário:** "Intermediário, 4 dias, 60 minutos, tenho tudo"

**IA:** "Perfeito! Vou gerar um plano de hipertrofia de 4 dias para você...

[Aqui viria o JSON do treino]

Quer que eu crie também um plano alimentar para acompanhar? 🥗"

---

## 4. Dicas de Prompt Engineering

### ✅ Boas Práticas

1. **Seja específico**: Inclua todos os detalhes relevantes
2. **Use estrutura**: Organize as informações em seções
3. **Peça JSON**: Especifique o formato esperado
4. **Limite tokens**: Peça respostas concisas
5. **Contexto claro**: Defina o papel da IA (treinador, nutricionista)

### ❌ Evite

- Prompts muito genéricos
- Pedir múltiplas tarefas em um prompt
- Deixar ambiguidades
- Esquecer de especificar o formato de saída

---

## 5. Variáveis Dinâmicas

Use essas variáveis nos prompts:

```javascript
const userProfile = {
  objective: 'hipertrofia', // hipertrofia, emagrecimento, força
  level: 'intermediário', // iniciante, intermediário, avançado
  daysPerWeek: 4,
  sessionDuration: 60,
  equipment: ['barra', 'halteres', 'máquinas'],
  restrictions: [],
  preferences: {}
};

// No prompt:
`Crie um treino para ${userProfile.objective}, nível ${userProfile.level}, ${userProfile.daysPerWeek} dias/semana...`
```

---

## 6. Tratamento de Erros

Se a IA retornar texto em vez de JSON:

```javascript
try {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
} catch (e) {
  console.error('Erro ao fazer parse:', e);
  // Retornar resposta padrão ou pedir novo prompt
}
```

---

**Última atualização:** 2024
