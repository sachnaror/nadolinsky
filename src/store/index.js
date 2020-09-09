import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './db-model'

Vue.use(Vuex)

const types = {
  SET_FORM_FIELD_VALUE: "SET_FORM_FIELD_VALUE",
  SET_FORM_DATA: "SET_FORM_DATA",
  SET_SUCCESSFUL_FILLING: "SET_SUCCESSFUL_FILLING"
}

const store = new Vuex.Store({
  state: {
    form: {
      name: "",
      surname: "",
      email: "",
      country: "",
      city: "",
    },
    successfulFilled: {
      name: true,
      surname: true,
      email: true,
      country: true,
      city: true
    },
    fields: [
      {
        label: "Name",
        placeholder: "Type your name",
        description: "name",
        type: "text"
      },
      {
        label: "Surname",
        placeholder: "Type your surname",
        description: "name",
        type: "text"
      },
      {
        label: "E-mail",
        placeholder: "Type your e-mail",
        description: "email",
        type: "text"
      },
      {
        label: "Country",
        placeholder: "Type your country",
        description: "name",
        type: "text"
      },
      {
        label: "City",
        placeholder: "Type your city",
        description: "name",
        type: "text"
      }
    ],
    inputsCount: 5
  },
  mutations: {
    ...vuexfireMutations,
    [types.SET_FORM_FIELD_VALUE]: (state, { text, label }) => {
      state.form[label] = text
    },
    [types.SET_SUCCESSFUL_FILLING]: (state, { label, success }) => {
      state.successfulFilled[label] = success
    },
    [types.SET_FORM_DATA]: (state, { docID }) => {
      state.docID = docID
    },
  },
  actions: {
    setFormField({ commit, state }, { text, label }) {
      db.collection("form-data")
        .doc(state.docID)
        .update({
          ...state.form,
          [label]: text
        })
        .then(() => {
          commit(types.SET_FORM_FIELD_VALUE, { text, label });
          commit(types.SET_SUCCESSFUL_FILLING, { label, success: true });
        })
        .catch((error) => {
          commit(types.SET_SUCCESSFUL_FILLING, { label, success: !!error });
        });
    },
    readFormData({ commit }) {
      let docID = ""
      db.collection("form-data")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            docID = doc.id
          });
          commit(types.SET_FORM_DATA, { docID })
        })
        .catch((error) => {
          console.log("Error getting document: ", error);
        });
    },
    bindForm: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('form', db.collection('form'))
    }),
  },
})

export default store;
