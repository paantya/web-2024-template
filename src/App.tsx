import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Recipe {
  id: number;
  name: string;
  servings: number;
  ingredients: string[];
}

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #ffeb3b; // Яркий фон
  border-radius: 8px; // Закругленные углы
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); // Тень
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
    background-color: #6200ea; // Новый цвет кнопки
    color: white;
    &:hover {
      background-color: #3700b3; // Цвет при наведении
    }
  }
`;

const StyledListItemText = styled(ListItemText)`
  && {
    text-align: left; // Выравнивание текста
    font-weight: bold; // Жирный шрифт
  }
`;

function App() {
  const [recipes, setRecipes] = useLocalStorageState<Recipe[]>("recipes", {
    defaultValue: [],
  });
  const [newRecipeName, setNewRecipeName] = useState("");
  const [newServings, setNewServings] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editServings, setEditServings] = useState(1);

  useEffect(() => {
    if (recipes.length === 0) {
      const boilerplateRecipes = [
        { id: 1, name: "Паста", servings: 2, ingredients: ["Паста", "Соль", "Вода"] },
        { id: 2, name: "Салат", servings: 4, ingredients: ["Листья салата", "Помидоры", "Огурцы"] },
        { id: 3, name: "Суп", servings: 3, ingredients: ["Бульон", "Овощи", "Специи"] },
        { id: 4, name: "Пицца", servings: 2, ingredients: ["Тесто", "Сыр", "Томатный соус"] },
        { id: 5, name: "Бургер", servings: 1, ingredients: ["Булочка", "Мясо", "Овощи"] },
      ];
      setRecipes(boilerplateRecipes);
      console.log("Добавлены начальные рецепты:", boilerplateRecipes); // Отладочный вывод
    }
  }, [recipes, setRecipes]);

  const handleAddRecipe = () => {
    if (newRecipeName.trim() === "") {
      console.error("Название рецепта не может быть пустым"); // Сообщение об ошибке
      return;
    }
    if (newServings <= 0) {
      console.error("Количество порций должно быть больше нуля"); // Сообщение об ошибке
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: newRecipeName.trim(),
      servings: newServings,
      ingredients: [], // Здесь можно добавить логику для ввода ингредиентов
    };
    setRecipes([...recipes, newRecipe]);
    console.log("Добавленный рецепт:", newRecipe); // Отладочный вывод
    setNewRecipeName("");
    setNewServings(1);
  };

  const handleDeleteRecipe = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleEditRecipe = (id: number) => {
    setEditingId(id);
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    if (recipeToEdit) {
      setEditName(recipeToEdit.name);
      setEditServings(recipeToEdit.servings);
    }
  };

  const handleUpdateRecipe = (id: number) => {
    if (editName.trim() !== "") {
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === id ? { ...recipe, name: editName.trim(), servings: editServings } : recipe
        )
      );
    }
    setEditingId(null);
    setEditName("");
    setEditServings(1);
  };

  return (
    <AppContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Рецепты Блюд
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Название Рецепта"
        value={newRecipeName}
        onChange={(e) => setNewRecipeName(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddRecipe()}
        autoFocus
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Количество Порций"
        type="number"
        value={newServings}
        onChange={(e) => setNewServings(Number(e.target.value))}
      />
      <StyledButton
        variant="contained"
        fullWidth
        onClick={handleAddRecipe}
      >
        Добавить Рецепт
      </StyledButton>
      <List>
        {recipes.map((recipe) => (
          <ListItem key={recipe.id} dense>
            {editingId === recipe.id ? (
              <>
                <TextField
                  fullWidth
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleUpdateRecipe(recipe.id)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleUpdateRecipe(recipe.id)
                  }
                  autoFocus
                />
                <TextField
                  fullWidth
                  type="number"
                  value={editServings}
                  onChange={(e) => setEditServings(Number(e.target.value))}
                  onBlur={() => handleUpdateRecipe(recipe.id)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleUpdateRecipe(recipe.id)
                  }
                />
              </>
            ) : (
              <StyledListItemText primary={`${recipe.name} - ${recipe.servings} порций`} />
            )}
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditRecipe(recipe.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteRecipe(recipe.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </AppContainer>
  );
}

export default App;