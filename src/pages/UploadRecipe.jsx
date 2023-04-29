import { addRecipe } from '../api';

const UploadRecipe = () => {
    const recipeType = "User-uploaded";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, ingredients, instructions, thumb } = e.target.elements;
        console.log(`${name.value} ${ingredients.value} ${instructions.value} ${thumb.value} `);
        addRecipe(name.value, ingredients.value, instructions.value, recipeType, thumb.value, 0)
        .then((response) => {
            console.log(response);
            alert(`Recipe "${name.value}" has been uploaded successfully.`);
            window.location.replace('/');
        })
        .catch((error) => {
            alert(error);
        });
    };

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
        <h1>Upload Recipe</h1>
        </div>
        </div>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Recipe Name:</label>
            <input type="text" id="name" name="name" className="form-control" required />
        </div>
        <div className="form-group">
            <label htmlFor="firstname">Ingredients:</label>
            <textarea id="ingredients" name="ingredients" className="form-control" required></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="instructions">Instructions:</label>
            <textarea id="instructions" name="instructions" className="form-control" required></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="email">Thumbnail Image Link:</label>
            <input type="text" id="thumb" name="thumb" className="form-control" required />
        </div>
        <div className="text-right">
            <button type="submit" className="btn btn-outline-light">Upload</button>
        </div>
        </form>
        </div>
        </div>

        </>
    );
};

export default UploadRecipe;
