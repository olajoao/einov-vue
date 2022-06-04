import { defineStore } from "pinia";

export const useUserStore = defineStore('useUserStore', {
  state: () => {
    return {
      users: [
        { name: 'Fulano da Silva', company: 'E-Inov Soluções Tecnológicas', email: 'fulano.silva@example.com', telefone: ['(98) 98856-3873', '(69) 98156-0036'], data: '2022-01-05' },
        { name: 'Fulano da Silva 2', company: 'E-Inov Soluções Tecnológicas', email: 'fulano.silva2@example.com', telefone: ['(63) 98252-8880'], data: '2022-01-16' },
        { name: 'Fulano da Silva 3', company: 'E-Inov Soluções Tecnológicas', email: 'fulano.silva3@example.com', telefone: ['(61) 99774-5388'], data: '2022-01-27' },
        { name: 'Fulano da Silva 4', company: '', email: 'fulano.silva4@example.com', telefone: ['(74) 99631-8854', '11111111'], data: '2022-02-09' },
        { name: 'Beltrano da Silva', company: '', email: 'beltrano.silva@example.com', telefone: ['(91) 99236-5070'], data: '2022-04-27' },
        { name: 'Beltrano da Silva 2', company: 'Guest Posts', email: 'beltrano.silva2@example.com', telefone: ['1111111', '2222222'], data: '2022-04-29' },
        { name: 'Beltrano da Silva 3', company: 'Guest Posts', email: 'beltrano.silva3@example.com', telefone: ['(67) 98698-2185'], data: '2022-05-02' },
        { name: 'Beltrano da Silva 4', company: 'Guest Posts', email: 'beltrano.silva4@example.com', telefone: ['96701190'], data: '2022-05-27' },
      ]
    }
  },
  actions: {
    addNewUser(infos) {
      this.users.push(infos);
    },
    editUser(index, infos) {
      this.users[index] = infos;
    }
  }
})

