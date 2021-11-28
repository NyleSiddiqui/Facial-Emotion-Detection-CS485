import React, { useContext, useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import { getResults } from "../fire/fire";
import Context from "../context";
import { AuthErrorCodes } from "@firebase/auth";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    paddingTop: '10m',
    paddingHorizontal: '10m',
  },
  container: {
    padding: '5m'
  },
  image: {
    height: '224px',
    width: '224px',
    paddingBottom: '1m',
  },
  upload_date: {
    flexWrap: 'wrap',
    paddingRight: '10m',
  }
});

// Create Document Component
export function PdfDocument() {
  const { notification, addNotification, removeNotification } =
    useContext(Context);

  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults()
      .then((res) => {
        setResults(res);
      })
      .catch((error) => {
        addNotification(error, "danger");
      });
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {results.map((result, idx) => {
            result = result.data();
            return (
              <>
                <View style={styles.container} key={idx}>
                  <Image style={styles.image} src={result.img} />
                  <Text>{result.emotion}</Text>
                  <Text>Uploaded on {result.time}</Text>
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