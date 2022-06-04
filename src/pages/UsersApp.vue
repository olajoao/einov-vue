<template>

  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Usuários</h1>
        <p class="mt-2 text-sm text-gray-700">Lista de usuários cadastrados no sistema.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button @click="addNewUserModal" type="button" class="inline-flex items-center justify-center rounded-md border border-transparent 
        bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
          Novo usuário
        </button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg md:max-h-[75vh] 2xl:max-h-[85vh] md:overflow-y-auto side__infos">
            <table class="min-w-full divide-y divide-gray-300 relative">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nome</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Empresa</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">E-mail</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Telefone</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data de cadastro</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(person, index) in users" :key="person.email">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ person.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.company }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.email }}</td>
                  <td 
                    class="whitespace-nowrap text-sm text-gray-500"
                    :class="[
                      person.telefone.length > 1 ? '' : 'px-3 py-4'
                    ]"
                  > 
                    <div class="relative" v-if="person.telefone.length > 1">
                      <button class="peer px-3 py-4 flex justify-between items-center" type="button">
                        <span class="mr-5">{{ person.telefone[0] }}</span>
                        <ChevronDownIcon class="w-5 h-5" />
                      </button>
                      <div class="hidden peer-focus:block p-5 rounded-bl-lg rounded-br-lg rounded-tl-lg shadow shadow-gray-300 absolute top-10 -left-5 z-20 bg-white">
                        <p class="my-3" v-for="(telefone, index) in person.telefone" :key="index">
                          {{ telefone }}
                        </p>
                      </div>
                    </div>
                    <span v-else>{{ person.telefone[0] }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.data }}</td>
                  <td class="flex justify-end gap-5 relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                    <button @click="fillUserToEdit(index)" class="text-indigo-600 hover:text-indigo-900"
                      >Editar<span class="sr-only">, {{ person.name }}</span></button
                    >
                    <button @click="removeItemFromList(index, users)" class="text-red-500 bg-gray-100 hover:bg-gray-200 p-1 rounded-md"
                      ><TrashIcon class="w-5 h-5" /><span class="sr-only">, Delete user {{ person.name }}</span></button
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <AddNewUserModal 
      :isOpen="isOpen === 'add-new-user'"
      :closeModal="closeModal"
    />

    <EditUserModal
      v-if="isOpen === 'edit-user'"
      :isOpen="isOpen === 'edit-user'"
      :closeModal="closeModal"
      :userIndex="userToEdit"
    />

  </div>
</template>


<script setup>
import { ref } from '@vue/reactivity';
import { TrashIcon, ChevronDownIcon } from '@heroicons/vue/outline';
import AddNewUserModal from '../components/AddNewUserModal.vue';
import EditUserModal from '../components/EditUserModal.vue';
import { useUserStore } from '@/store/UsersStore.js';

const userStore = useUserStore();

const users = userStore.users;

const isOpen = ref(null);

let userToEdit = ref(null);

function closeModal() {
  isOpen.value = false
}

function addNewUserModal() {
  isOpen.value = 'add-new-user';
}

function fillUserToEdit(index) {
  userToEdit.value = index;
  isOpen.value = 'edit-user';
}

function removeItemFromList(index, list) {
  list.splice(index, 1);
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>