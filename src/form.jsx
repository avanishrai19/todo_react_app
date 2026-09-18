function handleFormSubmit(e){
    e.preventDefault();
    console.log("Form was Submitted");
}

export default function Form(){
    return(
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Search Something" />
            <button type="submit">Submit</button>
        </form>
    )
}