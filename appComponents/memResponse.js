import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';



const memResponse = ({history}) => {
	const agree = async () => {
  		//console.log("Hello1");
  		/*
          API to be called:  (get) /dataprocessing
          Query Params: merchantUID(you get this as response from permissions function above), memberUID(=you should receive this upon login as message), question(= You get this as response from permissions function above)
          Response: 200 OK

          Please make the axios call below
      	*/
		try{
			const response = await axios.get('http://1f69218ca35b.ngrok.io/dataprocessing', {params: {
    			merchantUID: await EncryptedStorage.getItem('merchUID'),
    			memberUID: await EncryptedStorage.getItem('noid_uid'),
				//altID: await EncryptedStorage.getItem('memID'),
    			question: await EncryptedStorage.getItem('question')
    		}});

			alert('agreed to answer question: ' + await EncryptedStorage.getItem('question'));
			await EncryptedStorage.removeItem('merchUID');
			await EncryptedStorage.removeItem('question');

			history.push('/memProfile');
		}

		catch (error) {
			alert(error);
		}
	}

	const disagree = async () => {
    	//console.log("Hello2");

  		/*
          API to be called:  (get) /denied
          Query Params: merchantUID(you get this as response from permissions function above), memberUID(=you should receive this upon login as message), question(= You get this as response from permissions function above)
          Response: 200 OK
          
          Please make the axios call below
      	*/
      
      	try{
			const response = await axios.get('http://1f69218ca35b.ngrok.io/denied', {params: {
    			merchantUID: await EncryptedStorage.getItem('merchUID'),
    			member_id: await EncryptedStorage.getItem('noid_uid'),
    			question: await EncryptedStorage.getItem('question')
    		}});

			alert('refused to answer question: ' + await EncryptedStorage.getItem('question'));
			await EncryptedStorage.removeItem('merchUID');
			await EncryptedStorage.removeItem('question');

			history.push('/memProfile');
		}

		catch (error) {
			alert(error);
		}
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