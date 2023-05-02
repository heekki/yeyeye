import { addRecipe } from '../api';

const UploadRecipe = ({ user, userId }) => {
    const recipeType = "User-uploaded";

    console.log(user.username);
    console.log(userId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, ingredients, instruction, thumb } = e.target.elements;
        let thumbnail = thumb.value;
        if (thumbnail == 'Default') {
            thumbnail = 'https://cdn-icons-png.flaticon.com/512/666/666201.png';
        }
        addRecipe(name.value, ingredients.value, instruction.value, recipeType, thumbnail, 0, userId, user.username)
        .then((res) => {
            console.log(res.data);
            alert(`Recipe "${name.value}" has been uploaded successfully.`);
            window.location.replace(`recipe/User-uploaded/${res.data}`);
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
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea id="ingredients" name="ingredients" className="form-control" required></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="instruction">Instructions:</label>
            <textarea id="instruction" name="instruction" className="form-control" required></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="thumb">Thumbnail Image Link:</label>
            <input type="text" id="thumb" name="thumb" value="Default" className="form-control" />
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
