import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import { getResults } from "../fire/fire";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#E4E4E4',
    paddingTop: '10m',
    paddingHorizontal: '10m',
    textAlign: 'center',
    alignItems: 'flex-start'
  },
  title: {
    flexBasis: '100%',
    marginBottom: '2m',
  },
  container: {
    border: '1px solid #AAAAAA',
    flexBasis: '32%',
    margin: '1m',
    marginBottom: '10m',
    padding: '5m'
  },
  image: {
    width: '100%',
    maxHeight: '224px',
    paddingBottom: '1m',
  },
  upload_date: {
    fontSize: '12pt'
  }
});

// Create Document Component
export function PdfDocument() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults()
      .then((res) => {
        setResults(res);
      })
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Facial Emotion Detection - Past Results</Text>
        {results.map((result, idx) => {
            result = result.data();
            return (
              <>
                <View style={styles.container} key={idx} {...(idx % 9 === 0 && idx !== 0) ? {break: true}  : {}}>
                  <Image style={styles.image} src={result.img} />
                  <Text>{result.emotion}</Text>
                  <Text style={styles.upload_date}>Uploaded on {result.time}</Text>
                </View>
              </>
            );
          })}
      </Page>
    </Document>
  )
}

/*
<View style={styles.section} key={idx}>
                  <Text>{result.emotion}</Text>
                </View>
                <View style={styles.section} key={idx}>
                  <Text>Uploaded on {result.time}</Text>
                </View>
*/