import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getRecipe,
    fetchRecipeByType,
    fetchFavorite,
    addFavorite,
    deleteFavorite,
    deleteRecipe,
    getDiscuss,
    addDiscuss,
    updateDiscuss,
    deleteDiscuss
} from '../api';

function Recipe2({ user, userId }) {
    const [recipe, setRecipe] = useState(null);
    const [recipeByType, setRecipeByType] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const [discuss, setDiscuss] = useState([]);
    const [editShow, setEditShow] = useState(false);
    const [editForm, setEditForm] = useState('');
    const [editId, setEditId] = useState(null);
    const { id } = useParams();
    const recipeType = "User-uploaded";

    const goBack = () => {
        window.location.replace('/');
    };

    useEffect(() => {
        getRecipe(id)
            .then(res => {setRecipe(res.data)})
            .catch(err => {console.log(err)});
        if (recipeByType) {
            fetchFavorite(userId, recipeByType.id, setFavorite);
        } else {
            fetchRecipeByType(recipeType, id, setRecipeByType);
        }
        getDiscuss(id)
            .then(res => {setDiscuss(res.data)})
            .catch(err => {console.log(err)});
    }, [userId, id, recipeByType]);

    if (!recipe) {
        return (
            <div className="row mb-5">
            <div className="col-sm-12 primarycolor">
            Loading...
            </div>
            </div>
        );
    }

    const ingredientsDisplay = recipe.ingredients.split("\n");

    const handleFavoriteClick = async () => {
        await fetchRecipeByType(recipeType, id, setRecipeByType);
        try {
            if (!favorite) {
                await addFavorite(userId, recipeByType.id);
                setFavorite(true);
            } else {
                await deleteFavorite(userId, recipeByType.id);
                setFavorite(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const goEditRecipe = () => {
        window.location.replace(`/recipe/edit/${id}`);
    }

    const goDeleteRecipe = () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            deleteRecipe(id)
            .then(res => {
                alert('Recipe has been deleted.');
                window.location.replace('/recipe/User-uploaded');
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
        } else {
            console.log('no delete');
        }
    }

    const showButtons = () => {
        if (recipe.user_id == userId) {
            return (
                <>
                <button type="button" className="btn btn-outline-light btn-block" onClick={goEditRecipe}>Edit Recipe</button>
                <button type="button" className="btn btn-outline-light btn-block" onClick={goDeleteRecipe}>Delete Recipe</button>
                </>
            );
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { comment } = e.target.elements;
        addDiscuss(id, userId, comment.value, user.username)
            .then((response) => {console.log(response)})
            .catch((error) => {alert(error);});
        setTimeout(() => {window.location.reload()}, 500);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        const { editcomment } = e.target.elements;
        updateDiscuss(editId, editcomment.value)
            .then((response) => {console.log(response)})
            .catch((error) => {alert(error);});
        setEditForm('');
        setEditShow(false);
        setTimeout(() => {window.location.reload()}, 500);
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        setEditForm(e.target.value);
    };

    const goEditComment = (commentId, message) => {
        console.log('edit');
        setEditId(commentId);
        setEditForm(message);
        setEditShow(true);
    }

    const goDeleteComment = (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            deleteDiscuss(commentId)
            .then(res => {
                alert('Comment has been deleted.');
                setTimeout(() => {window.location.reload()}, 500);
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
        } else {
            console.log('no delete');
        }
    }

    const showPosted = (posted) => {
        const d = new Date(posted*1000);
        return d.toLocaleString();
    }

    return (
        <>
        <div className="row mb-2">

        <div className="col-sm-3">
        <div className="fakeimga img-hover">
            <a href={recipe.thumb} data-toggle="lightbox" data-gallery="gallery">
                <img src={recipe.thumb} alt={recipe.name} className="shadow-lg img-thumbnail" />
            </a>
            <button type="button" className={favorite ? "btn btn-outline-dark btn-block" : "btn btn-outline-light btn-block"} onClick={handleFavoriteClick}>{favorite ? "Unfavorite" : "Favorite"}</button>
            {showButtons()}
        </div>
        </div>

        <div className="col-sm-9 primarycolor">
            <h1>{recipe.name}</h1>
            <h4>Uploaded by: {recipe.username}</h4>
            <hr />
            <h4>Ingredients:</h4>
            <ul>
                {ingredientsDisplay.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            <hr />
            <h4>Instructions:</h4>
            <div style={{'whiteSpace':'pre-line'}}>
            {recipe.instruction}
            </div>
        </div>

        </div>

        <div className="row">
        <div className="col-sm-3">
        </div>
        <div className="col-sm-9 primarycolor">
            <hr />
            <h4>Discussion:</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea id="comment" name="comment" className="form-control" required></textarea>
                </div>
                <div className="text-right">
                    <button type="submit" className="btn btn-outline-light">Comment</button>
                </div>
            </form>
            <div className="box">
            <ul>
                {discuss[0] && discuss.map(
                    (d, index) => {
                        if (d.user_id == userId) {
                            return (
                                <>
                                <li key={d.comment_id}><b>#{d.comment_id} by {d.username} - {showPosted(d.posted)}</b>
                                <button style={{'float':'right'}}  className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </button>
                                <br style={{'lineHeight':'2em'}} />
                                {d.message}
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item btn-outline-light" onClick={() => goDeleteComment(d.comment_id)}>Delete</button>
                                    <button className="dropdown-item btn-outline-light" onClick={() => goEditComment(d.comment_id, d.message)}>Edit</button>
                                </div>
                                { (editShow && editId == d.comment_id) ? (
                                <form onSubmit={handleEdit}>
                                    <div className="form-group">
                                        <textarea id="editcomment" name="editcomment" className="form-control" value={editForm} onChange={handleInputChange} required></textarea>
                                    </div>
                                    <div className="text-right">
                                        <button onClick={() => setEditShow(false)} className="btn btn-danger mr-2 px-3">Discard</button>
                                        <button type="submit" className="btn btn-outline-light">Edit</button>
                                    </div>
                                </form>
                                ) : (null)}
                                </li>
                                </>
                            )
                        } else {
                            return (
                                <>
                                <li key={d.comment_id}><b>#{d.comment_id} by {d.username} - {showPosted(d.posted)}</b>
                                <br style={{'lineHeight':'2em'}} />
                                {d.message}
                                </li>
                                </>
                            )
                        }
                    }
                )}
            </ul>

            </div>
            <br />
            <button className="btn btn-outline-light" onClick={goBack}>Back to Home</button>
        </div>
        </div>

        </>
    );
}

export default Recipe2;
