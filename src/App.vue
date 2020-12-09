<template>
  <div id="app">
    <div class="container" >
      <div class="row mt-4">
        <div class="form-group col-6">
          <label for="name">Имя</label>
          <input type="text" name="name" id="name" class="form-control" v-model="name">
        </div>
        <div class="form-group col-6">
          <label for="surname">Фамилия</label>
          <input type="text" name="surname" id="surname" class="form-control" v-model="surname">
        </div>
      </div>
      <div class="row">
        <div class="form-group w-100">
          <label for="phone">Номер</label>
          <input type="text" name="phone" id="phone" class="form-control" v-model="phone">
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <input type="button" value="Сохранить" class="btn btn-success m-2" @click="Save()">
          <input type="button" value="Изменить" class="btn btn-secondary m-2" @click="onRe()">
          <input type="button" value="Удалить" class="btn btn-outline-info m-2" @click="onDe()">
        </div>
        <div class="col-4">
           <div class="form-check">
              <input type="checkbox" id="star" class="form-check-input" @click="Turn()">
              <label for="star" class="form-check-label">Избранный</label>
          </div>
          <div class="form-check">
              <input type="checkbox" id="sortName" class="form-check-input" @click="sortByName()">
              <label for="sortName" class="form-check-label">Сортировать по имени</label>
          </div>
          <div class="form-check">
              <input type="checkbox" id="star" class="form-check-input" @click="sortBySurname()">
              <label for="star" class="form-check-label">Сортировка по фамилии</label>
          </div>
        </div>
      </div>
      <hr class="my-4">
      <div class="row">
        <div class="col-4">Фамилия</div>
        <div class="col-4">Имя</div>
        <div class="col-4">Номер</div>
      </div>
      <div class="row " v-for="note in notes" :key="note.id" @click="[Rename(note.id), Delete(note.id)]">
        <div class="col-4"> {{note.name}} </div>
        <div class="col-4"> {{note.surname}} </div>
        <div class="col-4"> {{note.phone}} </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        notes: [],
        stars: [],
        name: '',
        surname: '',
        phone: '',
        starOn: false,
        sortingName: false,
        sortingSurname: false,
        rename: false,
        del: false,
      };
    },
    components: {},
    methods: {
      async updateData() {
        try {
          await this.$http.get('http://localhost:3000/notes').then((res) => res.json()).then((res) => (this.notes = res));
          this.notes.sort((a, b) => a.star === !b.star ? -1 : 1);
        } catch (err) {
          console.log(err);
        }
      },

      Turn() {
        this.starOn = !this.starOn;
      },

      sortByName() {
        this.sortingName = !this.sortingName;
        if(this.sortingName) {
          this.notes.sort((a, b) => a.name > b.name ? 1 : -1);
        } else {
          this.updateData();
        }
      },

      sortBySurname() {
        this.sortingSurname = !this.sortingSurname;
        if(this.sortingSurname) {
          this.notes.sort((a, b) => a.surname > b.surname ? 1 : -1);
        } else {
          this.updateData();
        }
      },

      async Save() {

        let note = {
          "name": this.name,
          "surname": this.surname,
          "phone": this.phone,
          "star": this.starOn
        };
        try{
          await this.$http.post('http://localhost:3000/notes', note);
          this.updateData();
        } catch(err) {
          console.error(err);
        }
      },

      onRe() {
        this.rename = !this.rename;

      },

      onDe() {
        this.del = !this.del;
      },

      async Rename(id) {
        let note = {
          "name": this.name,
          "surname": this.surname,
          "phone": this.phone
        };
        if(this.rename) {
          await this.$http.put(`http://localhost:3000/notes/${id}`, note);
          this.updateData();
        }
      },

      async Delete(id) {
        if(this.del) {
          await this.$http.delete(`http://localhost:3000/notes/${id}`);
          this.updateData();
        }
      }
    },
    created() {
      this.updateData();
    },
  };

</script>

<style>
  .col-4 {
    border: 1px solid purple;
  }
  button {
    color: #42b983;
  }
</style>
