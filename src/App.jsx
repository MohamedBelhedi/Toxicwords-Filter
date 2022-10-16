import React, { useState, useEffect } from 'react'
import './App.css'
import * as toxic from '@tensorflow-models/toxicity'

export default function App() {
  const [textInput, settextInput] = useState("")
  const [result, setResult] = useState("")
  const [bool, setBool] = useState([])
  const threshold = 0.9;
  const [vis, setVis] = useState(false)


  // const sentences = ['bitch'];
  const getPrediction = (e) => {

    if (e.key === "Enter") {

      toxic.load(threshold).then(

        console.log("Model Loaded")

      ).then(

        model => {


          model.classify(textInput).then(predictions => {

            console.log(predictions)
            for (let i = 0; i < predictions.length; i++) {

              console.log(predictions[i].label)
              console.log(predictions[i].results[0].match)
              setResult(predictions[i])
              setBool(JSON.stringify(predictions[i].results[0].match))

            }




          });
        })
    }

  }

  useEffect(() => {

    // getPrediction()

  }, [])



  return (
    <main>
      <h1>{result.label}</h1>
      <h1>{bool}</h1>
      {!bool === false ? <h1>Clean Website</h1> : <h1>Dirty Words</h1>}
      <input onKeyPress={getPrediction} onChange={(e) => {
        e.target.value
        console.log(e.target.value)
        settextInput(e.target.value)
      }} value={textInput} />
    </main>
  )
}
