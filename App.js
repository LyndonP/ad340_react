import React, { Component } from 'react';
import { FlatList, Text, View, Image, Button, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: 'grey'}}>
          WSDOT & SDOT Traffic Cams
        </Text>
        <Button
          onPress= { () => navigate("Cameras") }
          title="Traffic Cameras"
          color="steelblue"
          />
      </View>
    );
  }
}


class CameraScreen extends Component {

  static navigationOptions = {
    title: 'Cameras',
  };

  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2');
    const json = await response.json();
    this.setState({ data: json.Features });
  };

  cameraType(camera) {
      if(camera.Type == 'sdot'){
            return  "http://www.seattle.gov/trafficcams/images/"+camera.ImageUrl;
      }else{
            return "http://images.wsdot.wa.gov/nw/"+camera.ImageUrl;
      }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>

        <FlatList
          data={this.state.data}
          // x is the object 
          keyExtractor={(x, index) => index.toString()}
          renderItem={ ({item}) =>
            <View style={styles.textM}>
             <Image
                source = {{ uri: this.cameraType(item.Cameras[0]) }}
                style = {{height: 250, margin: 3}}
                />

              <Text style={{fontSize: 20, color: 'steelblue'}}>
                {`${item.Cameras[0].Description}`}
              </Text>
            </View>

          }
         />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textM: {
    marginBottom: 30
  },
});

export default class App extends Component {
  render () {
    return <NavigationApp />;
  }
}

const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    Cameras: { screen: CameraScreen },
});