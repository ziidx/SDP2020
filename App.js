
import React from 'react';

import styles from './appComponents/compStyles';
import welcomePage from './appComponents/Home';
import memLogin from './appComponents/memberLogin';
import merchLogin from './appComponents/merchLogin';
import accMake from './appComponents/accMake';
import memProfile from './appComponents/memProfile';
import merchProfile from './appComponents/merchProfile';
import memResponse from './appComponents/memResponse';

import 
{
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import 
{ 
  NativeRouter, 
  Route, 
  Switch 
} from 'react-router-native';

/**
* Router/Directory for navigating pages of the app, see appComponents folder.
*/
const App = () => {
  return (
  <NativeRouter>
    <View style={styles.container}>
      <Switch>
        <Route exact path="/" component={welcomePage} />
        <Route path="/memberLogin" component={memLogin} />
        <Route path="/merchantLogin" component={merchLogin} />
        <Route path="/accountCreation" component={accMake} />
        <Route path="/memProfile" component={memProfile} />
        <Route path="/merchProfile" component={merchProfile} />
        <Route path="/memResponse" component={memResponse} />
      </Switch>
    </View>
  </NativeRouter>
  );
}

export default App;
