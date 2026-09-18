function PrintBtn(event) {
    console.log("Button was clicked");
    console.log(event)
}
function Printread(){
  console.log("ParaGraph readed")
}

export default function Button() {
    return (
        <div>
            <button onClick={PrintBtn}>Click Me</button>
            <p onMouseOver={Printread}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Possimus repellat ea eos iusto nemo consequatur! 
            </p>
        </div>
        
    );
}