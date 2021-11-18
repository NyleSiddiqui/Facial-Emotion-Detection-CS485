import * as tf from '@tensorflow/tfjs';
import {getModelURL} from './fire'

let model = null

function loadModel() {
    getModel().then(loadedModel => {
        model = loadedModel
        let zeros = tf.fill([1, 224, 224, 3], 0)
        model.predict(zeros);
    })
}

function getModel() {
    return new Promise((resolve, reject) => {
        tf.ready().then(() => {
            getModelURL().then(url => {
                tf.loadLayersModel(url).then(model => {
                    // model.summary();
                    console.log("Model Loaded")
                    resolve(model)
                });
            })
        })
    })
}

function detectEmotion(img) {
    if(model != null) {
        let tensor = tf.browser.fromPixels(img)
        let zeros = tf.fill([1, 224, 224, 3], 255)
        tensor = tf.reshape(tensor,[1, 224, 224, 3])
        tensor = tf.div(tensor, zeros)
        let results = model.predict(tensor)
        results = results.dataSync();
        console.log(results)
        let emotions = getTopThreeEmotions(results)
        return emotions
    } else {
        console.log("ERR: Model not loaded!")
        return ['NULL', 'NULL', 'NULL']
    }
}

function getTopThreeEmotions(results) {
    //Neutral, Happy, Sad, Surprise, Fear, Disgust, Anger, Contempt.
    const emotions = ['Neutral', 'Happy', 'Sad', 'Surprise', 'Fear',
        'Disgust', 'Anger', 'Contempt']
    let first = 0;
    let second = 0;
    let third = 0;
    let fIndex = -1;
    let sIndex = -1;
    let tIndex = -1;
    for(let i = 0; i < results.length; i++) {
        let conf = results[i]
        if(conf > first) {
            third = second;
            tIndex = sIndex;
            second = first;
            sIndex = fIndex
            first = conf;
            fIndex = i;
        } else if (conf > second) {
            third = second;
            tIndex = sIndex;
            second = conf;
            sIndex = i;
        } else if (conf > third) {
            third = conf;
            tIndex = i;
        }
        
    }
    first = Math.round(first*100)
    second = Math.round(second*100)
    third = Math.round(third*100)
    let topThree = [{'conf': first, 'emotion': emotions[fIndex]},
    {'conf': second, 'emotion': emotions[sIndex]}, 
    {'conf': third, 'emotion': emotions[tIndex]}]
    console.log(topThree)
    return topThree
}

export {getModel, loadModel,detectEmotion}
