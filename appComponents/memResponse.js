import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import {memData} from './memberLogin';



const memResponse = ({history}) => {
 	function agree(){
  		console.log("Hello1");

  		/*
          API to be called:  (get) /dataprocessing
          Query Params: merchantUID(you get this as response from permissions function above), memberUID(=you should receive this upon login as message), question(= You get this as response from permissions function above)
          Response: 200 OK

          Please make the axios call below
      	*/
      
     	axios
     		.get('http://70a8fe88caf7.ngrok.io/dataprocessing', {params: {
    			merchantUID: memData.merchUID,
    			memberUID: memData.id,
    			question: memData.question
    		}})
    		.then(function (response) {
    			console.log('agreed to answer question: ' + question);
      			alert(JSON.stringify(response.data));
      			history.push('/memProfile');
    		})
    		.catch(function (error) {
      			alert(error.message);
      		});
	}

	function disagree(){
    	console.log("Hello2");

  		/*
          API to be called:  (get) /denied
          Query Params: merchantUID(you get this as response from permissions function above), memberUID(=you should receive this upon login as message), question(= You get this as response from permissions function above)
          Response: 200 OK
          
          Please make the axios call below
      	*/
      
      	axios
    		.get('/denied', {params: {
    			merchantUID: memData.merchUID,
    			memberUID: memData.id,
    			question: memData.question
    		}})
    		.then(function (response) {
    			console.log('refuse to answer question: ' + question);
      			alert(JSON.stringify(response.data));
      			history.push('/memProfile');
    		})
    		.catch(function (error) {
      			alert(error.message);
  			});
 	}


 	return(
   		<View>
    	<Text style={styles.header}>
        	Welcome to the Member Profile Page!
     	</Text>

    	<View>
        	<TouchableOpacity
        		style={styles.buttonStyle}
        		onPress={agree}>
          		<Text> Click to accept request </Text>
        	</TouchableOpacity>

        	<TouchableOpacity
          		style={styles.buttonStyle}
          		onPress= {disagree}>
          		<Text> Click to deny request </Text>
        	</TouchableOpacity>
      	</View>

    </View>
  )
}

export default memResponse;