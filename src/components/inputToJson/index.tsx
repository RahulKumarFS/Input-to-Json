import { useState } from "react";

export default function InputToJson() {
  const [parameterNames, setParameterNames] = useState<string[]>([]);
  const [jsonList, setJsonList] = useState<any>([]);
  const [objectPropertyName, setObjectPropertyName] = useState<string>("");
  const [dynamicObject, setDynamicObject] = useState<any>();

  const handleAddObjectProperty = (property: string) => {
    let temp = [...parameterNames];
    temp.push(property);
    setParameterNames(temp);
    setObjectPropertyName("");
  };
  const handleRemoveObjectProperty = (index: number) => {
    let temp = [...parameterNames];
    temp.splice(index, 1);
    setParameterNames(temp);
  };
  const handleInputToObject = (property: string, value: string) => {
    const obj = {
      id: (Math.random() + 1).toString(36).substring(2),
      [property]: value,
    };
    setDynamicObject({ ...dynamicObject, ...obj });
  };
  const handleAddToJson = () => {
    const temp = [...jsonList];
    temp.push(dynamicObject);
    setJsonList(temp);
    setDynamicObject({});
  };
  return (
    <div
      className="w-full"
      style={{ display: "flex",flexDirection:"column", gap: "10px", padding: "5px" , justifyContent:"space-between"}}
    >
      {/* <form> */}
      <div style={{
          display: "flex",
          flexDirection:"row",
          gap:"10px"
        }}>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flexDirection: "column",
          padding: "10px",
          width:"400px",
          height: "auto",
        }}
      >
        <h3>Enter Project Properties from app</h3>
        <input
          type="text"
          value={objectPropertyName}
          placeholder="Object property"
          onChange={(e: any) => setObjectPropertyName(e.target.value)}
        />
        <br/>
        <button
          type="submit"
          onClick={() => handleAddObjectProperty(objectPropertyName)}
        >
          Add
        </button>
      </div>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flexDirection: "column",
          padding: "10px",
          width:"100%",
          height: "auto",
        }}
      >
        <h4>Object property list</h4>
        <div className="w-full">
          {parameterNames.map((item: string, key: number) => (
            <div key={key} className="!flex !justify-between gap-4 w-full" style={{display:"flex", justifyContent:"space-between"}}>
              <div>{item}</div>
              <br/>
              <div>
                <button onClick={() => handleRemoveObjectProperty(key)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div  style={{
          display: "flex",
          flexDirection:"column",
          gap:"10px"
        }}>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flexDirection: "column",
          padding: "10px",
          width:"100%",
          height: "100%",
        }}
      >
        <h3>Enter Value to Object</h3>
        <div>
          {parameterNames.map((item: string, key: number) => (
            <div key={key} className="!flex !justify-between gap-4 w-full">
              <div>{item}</div>
              <input
                type="text"
                style={{width:"900px"}}
                onChange={(e: any) => handleInputToObject(item, e.target.value)}
              />
            </div>
          ))}
        </div>
        <br/>
        <div>
          <button onClick={() => handleAddToJson()}> Add to Array</button>
        </div>
        <pre>{JSON.stringify(dynamicObject, null, 2)}</pre>
      </div>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          flexDirection: "column",
          padding: "10px",
          width:"100%",
          height: "100%",
        }}
      >
        <h3>Final Result</h3>
        <div><button onClick={()=>setJsonList([])}>Clear Array</button></div>
        <pre>{JSON.stringify(jsonList, null, 2)}</pre>
      </div>
      </div>
    </div>
  );
}
