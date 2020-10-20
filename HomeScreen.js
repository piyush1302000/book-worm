import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import BookCount from '../components/BookCount';
import {Ionicons} from '@expo/vector-icons'
import CustomButton from '../components/CustomButton'
import {snapshotToArray} from '../Helpers/firebaseHelpers'
import * as firebase from 'firebase/app'
import 'firebase/database'
import * as Animatable from 'react-native-animatable'

export class HomeScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      currentUser: {},
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBook: false,
      textInputData: '',
      books: [],
      booksReading: [],
      booksRead: []
    }
    // this.textInputRef = null;
  }

  componentDidMount = async() => {
    const {navigation} = this.props
    const user = navigation.getParam('user')
    const currentUserData = await firebase.database().ref('users').child(user.uid).once('value')
    const books = await firebase.database().ref('books').child(user.uid).once('value')
    const booksArray = snapshotToArray(books);
    this.setState({currentUser: currentUserData.val(), books: booksArray, bookReading: booksArray.filter(book => !book.read),
    booksRead: booksArray.filter(book => book.read) })
  }

  showAddNewBook = () => {
    this.setState({
      isAddNewBook: true
    })
  };

  hideInputText = () => {
    this.setState({
      isAddNewBook: false
    })
  };

  addBook = async(book) => {
    //  this.setState({textInputData: ''})
    //  this.textInputRef.setNativeProps({text: ''})
    try{
    const snapShot = await firebase.database().ref('books').child(this.state.currentUser.uid).orderByChild('name').equalTo(book).once('value');

    if (snapShot.exists()) {
      alert('Unable to add as book already exists')
    }
    else {
      const key = await firebase.database().ref('books').child(this.state.currentUser.uid).push().key;
      const response = await firebase.database().ref('books').child(this.state.currentUser.uid).child(key).set({name: book, read: false});

      this.setState((state,props)=> ({
       books: [...state.books, {name: book, read: false}],
       booksReading: [...state.booksReading, {name: book, read: false}]
       }),
       () => {}
       )
      }
     }catch(error){
      console.log(error)
     }
  }

  markAsRead = async(selectedBook, index) => {

    try{
      await firebase.database().ref('books').child(this.state.currentUser.uid).child(selectedBook.key).update({read: true})

      let newList = this.state.books.map(book => {
        if (book.name == selectedBook.name) {
          return {...book, read: true}
        }
        return book
      });
      let bookReading = this.state.booksReading.filter(book => book.name !== selectedBook.name)
      this.setState((state, props) => ({
        books: newList,
        booksReading: bookReading,
        booksRead: [...state.booksRead, {name: selectedBook.name, read: true}]
      }))

    }catch(error){
      console.log(error)
    }
  }

  renderItem = (item, index) => (
      <View style={styles.renderItemContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/icon.png')} />
      </View>
        <View style={styles.renderItemText}>
        <Text style={styles.listItemTitle}> {item.name} </Text>
        </View>
        {item.read ?
         (
           <Ionicons name="ios-checkmark" color={"#bada55"} size={30} />
         )
        : (
        <CustomButton onPress={() => this.markAsRead(item, index)} style={styles.MarkAsReadContainer}>
        <Text style={styles.MarkAsReadText}>Mark as Read</Text>
        </CustomButton>
        )}  
      </View>
  );

  render(){
  return (
    <View style={styles.container}>
      <SafeAreaView/>
      <View style={styles.TitleContainer}>
        <Text style={{fontSize: 25}}>Book Worm</Text>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.TextInputContainer}>
              <TextInput 
              onChangeText={text => this.setState({ textInputData: text})}
              style={styles.TextInputText}
              placeholder="Enter Book Name"
              placeholderTextColor="#466575"
              // ref={component => {this.textInputRef = component}}
             />
            </View>
            {/* {this.state.isAddNewBook && (
            <View style={styles.TextInputContainer}>
            <CustomButton style={{backgroundColor: '#a5deba'}} onPress={() => this.addBook(this.state.textInputData)}>
            <Ionicons name="ios-checkmark" color="#fff" size={40} />
            </CustomButton>
            <CustomButton style={{backgroundColor: '#deada5'}} onPress={this.hideInputText}>
            <Ionicons name="ios-close" color="#fff" size={40} />
            </CustomButton>
            </View> */}
            {/* )} */}
            <FlatList
             data={this.state.books}
             renderItem={({item},index) => this.renderItem(item,index)}
             keyExtractor={(item, index) => index.toString()}
             ListEmptyComponent={
            <View style={styles.ListEmptyComponentContainer}>
            <Text style={{fontWeight: 'bold'}}>Not Reading Any Books</Text>
            </View>} />
      
            <Animatable.View animation={this.state.textInputData.length > 0 ? 'slideInRight' : 'slideOutRight'}> 
            <CustomButton style={styles.AddNewBookContainer1} position="right" onPress={() => this.addBook(this.state.textInputData)}>
            <Text style={styles.AddNewBookText}>+</Text>
            </CustomButton>
            </Animatable.View> 
          </View>
          
          <View style={styles.BookCountContainer}>
            <BookCount title="Total" count={this.state.books.length} />
            <BookCount title="Reading" count={this.state.booksReading.length} />
            <BookCount title="Read" count={this.state.booksRead.length} />
          <SafeAreaView/>
    </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E424D',
  },
  renderItemContainer: {
    flexDirection: 'row',
    minHeight: 100,
    backgroundColor: '#354D58DA',
    alignItems: 'center',
    marginVertical: 5
  },
  renderItemText: {
     flex: 1,
     justifyContent: 'center',
     paddingLeft: 5
  },
  MarkAsReadContainer: {
    width: 100,
   backgroundColor: '#a5deba'
  },
  MarkAsReadText: {
    fontWeight: 'bold',
    color: '#fff'
  },
  TitleContainer: {
    height: 120,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E9E9E9',
    alignItems: 'center',
   justifyContent: 'center'
  },
  TextInputContainer: {
    height: 50,
    flexDirection: 'row',
    margin: 5
  },
  TextInputText: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    borderColor: '#354D58DA',
    borderBottomWidth: 5,
    fontSize: 22,
    fontWeight: '200',
    color: '#fff'
  },
  ListEmptyComponentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  AddNewBookContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  AddNewBookContainer1: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAD1E6'
  },
  AddNewBookText: {
    color: '#fff',
    fontSize: 32
  },
  BookCountContainer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: '#E9E9E9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemTitle: {
    fontSize: 22,
    fontWeight: '100',
    color: '#fff'
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35
  }
});
