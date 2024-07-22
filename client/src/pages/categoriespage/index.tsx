import React, { useState, useEffect } from 'react';
import { useCategories } from '../../hooks';
import styles from './categoriespage.module.css';

const CategoriesPage: React.FC = () => {
    const {
        categoryData,
        categories,
        createCategory,
        updateCategory,
        getCategoryByName,
        deleteCategory,
        getAllCategories,
        loading,
        error,
        resetError,
    } = useCategories();

    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [isCreating, setIsCreating] = useState(false); // estado para controlar a tela de criação
    const [isEditing, setIsEditing] = useState(false); // estado para controlar a tela de edição
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editCategoryDescription, setEditCategoryDescription] = useState('');

    useEffect(() => {
        getAllCategories(); // carregar categorias ao iniciar
    }, [getAllCategories]);

    const handleCreateCategory = async () => {
        await createCategory({ name: newCategoryName, description: newCategoryDescription });
        setNewCategoryName('');
        setNewCategoryDescription('');
        setIsCreating(false); // esconder a tela de criação após criar a categoria
        await getAllCategories(); // atualizar lista de categorias
    };

    const handleUpdateCategory = async () => {
        await updateCategory(editCategoryName, { description: editCategoryDescription });
        setEditCategoryName('');
        setEditCategoryDescription('');
        setIsEditing(false); // esconder a tela de edição após atualizar a categoria
        await getAllCategories(); // atualizar lista de categorias
    };

    const handleDeleteCategory = async (categoryName: string) => {
        await deleteCategory(categoryName);
        await getAllCategories(); // atualizar lista de categorias
    };

    const handleEditClick = (categoryName: string, categoryDescription: string) => {
        setEditCategoryName(categoryName);
        setEditCategoryDescription(categoryDescription);
        setIsEditing(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Gerenciamento de Categorias</h1>
            </div>

            {loading && <p>Carregando...</p>}
            {error && (
                <div className={styles.error}>
                    <p>Erro: {error}</p>
                    <button className={styles.button} onClick={resetError}>Resetar Erro</button>
                </div>
            )}

            <div className={styles.categoryList}>
                <h2>Categorias</h2>
                <ul>
                    {categories.map((category) => (
                        <li className={styles.listItem} key={category.name}>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            <button className={styles.button} onClick={() => handleEditClick(category.name, category.description || '')}>Atualizar</button>
                            <button className={styles.button} onClick={() => handleDeleteCategory(category.name)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className={styles.createCategory}>
                <button className={styles.button} onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? 'Cancelar' : 'Criar Categoria'}
                </button>
                {isCreating && (
                    <div className={styles.createForm}>
                        <h2>Nova Categoria</h2>
                        <input
                            className={styles.inputField}
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Nome da Categoria"
                        />
                        <input
                            className={styles.inputField}
                            type="text"
                            value={newCategoryDescription}
                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                            placeholder="Descrição (opcional)"
                        />
                        <button className={styles.button} onClick={handleCreateCategory}>Criar</button>
                    </div>
                )}
            </div>

            {isEditing && (
                <div className={styles.editCategory}>
                    <h2>Editar Categoria</h2>
                    <input
                        className={styles.inputField}
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        placeholder="Nome da Categoria"
                    />
                    <input
                        className={styles.inputField}
                        type="text"
                        value={editCategoryDescription}
                        onChange={(e) => setEditCategoryDescription(e.target.value)}
                        placeholder="Descrição (opcional)"
                    />
                    <button className={styles.button} onClick={handleUpdateCategory}>Salvar</button>
                    <button className={styles.button} onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
