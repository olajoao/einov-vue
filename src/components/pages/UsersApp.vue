<template>

  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Usuários</h1>
        <p class="mt-2 text-sm text-gray-700">Lista de usuários cadastros no sistema.</p>
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
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
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
                <tr v-for="person in users" :key="person.email">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ person.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.company }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex flex-col overflow-y-auto max-h-14">{{ person.telefone[0] }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.data }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Editar<span class="sr-only">, {{ person.name }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Add new user modal -->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-h-[80vh] max-w-md transform overflow-x-hidden overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Registrar novo usuário
              </DialogTitle>

              <div class="mt-5">
                <label class="font-bold uppercase text-gray-600 text-xs" for="name">Nome</label>
                <input v-model="newUserInfos.name" type="text" id="name" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
              </div>

              <div class="mt-2">
                <label class="font-bold uppercase text-gray-600 text-xs" for="company">Empresa</label>
                <input v-model="newUserInfos.company" type="text" id="company" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
              </div>

              <div class="mt-2">
                <label class="font-bold uppercase text-gray-600 text-xs" for="email">E-mail</label>
                <input v-model="newUserInfos.email" type="email" id="email" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
              </div>

              <div class="mt-3 flex items-end gap-2">
                <label class="flex-1 font-bold uppercase text-gray-600 text-xs" for="email">
                  Telefone
                  <input v-model="newUserInfos.telefone" type="tel" id="telefone" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
                </label>
                <button @click="addNumberToPreviewList" class="rounded-md bg-gray-100 hover:bg-gray-200 text-indigo-500 p-2">
                  <PlusIcon class="w-5 h-5" />
                </button>
              </div>

              <div v-if="previewPhoneList.length > 0" class="mt-2">
                <ul>
                  <TransitionGroup>
                    <li v-for="(phone, index) in previewPhoneList" :key="index" class="mb-3 text-sm border border-transparent hover:border-gray-100 pl-2 rounded-md">
                      <div class="flex items-center justify-between">
                        <span>{{ index + 1 }}) {{ phone }}</span>
                        <button @click="removeItemFromPreviewList(index)" class="bg-gray-100 hover:bg-gray-200 rounded-md p-2">
                          <XIcon class="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </li>
                  </TransitionGroup>
                </ul>
              </div>

              <div class="mt-2">
                <label class="font-bold uppercase text-gray-600 text-xs" for="registerDate">Data de cadastro</label>
                <input v-model="newUserInfos.data" type="date" id="registerDate" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
              </div>
              
              <div class="mt-5 flex justify-end gap-5">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="addNewUser"
                >
                  Confirmar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


<script setup>
import { ref } from '@vue/reactivity';
import { PlusIcon, XIcon } from '@heroicons/vue/outline';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

const users = ref([
  { name: 'Fulano da Silva', company: 'E-Inov Soluções Tecnológicas', email: 'fulano.silva@example.com', telefone: ['96701190', '84488448'], data: '2022-01-05' },
  { name: 'Fulano da Silva 2', company: 'E-Inov Soluções Tecnológicas', email: 'fulano.silva2@example.com', telefone: ['96701190'], data: '2022-01-16' },
  { name: 'Fulano da Silva 3', company: 'E-Inov Soluções Tecnológicas', email: 'fulano.silva3@example.com', telefone: ['96701190'], data: '2022-01-27' },
  { name: 'Fulano da Silva 4', company: '', email: 'fulano.silva4@example.com', telefone: ['96701190'], data: '2022-02-09' },
  { name: 'Beltrano da Silva', company: '', email: 'beltrano.silva@example.com', telefone: ['96701190'], data: '2022-04-27' },
  { name: 'Beltrano da Silva 2', company: 'Guest Posts', email: 'beltrano.silva2@example.com', telefone: ['96701190'], data: '2022-04-29' },
  { name: 'Beltrano da Silva 3', company: 'Guest Posts', email: 'beltrano.silva3@example.com', telefone: ['96701190'], data: '2022-05-02' },
  { name: 'Beltrano da Silva 4', company: 'Guest Posts', email: 'beltrano.silva4@example.com', telefone: ['96701190'], data: '2022-05-27' },
]);

const previewPhoneList = ref([])

const newUserInfos = ref({});

const isOpen = ref(true);

function closeModal() {
  isOpen.value = false
}

function addNewUserModal() {
  isOpen.value = true
}

function addNumberToPreviewList() {
  let currentNumber = newUserInfos.value.telefone;
  if(currentNumber && currentNumber != '') {
    previewPhoneList.value.push(newUserInfos.value.telefone);
    newUserInfos.value.telefone = '';
  }
  else console.log('Fill number field')
}

function removeItemFromPreviewList(index) {
  previewPhoneList.value.splice(index, 1);
}

function addNewUser() {
  newUserInfos.value.telefone = previewPhoneList.value;
  users.value.push(newUserInfos.value);

  closeModal();

  // clear inputs
  newUserInfos.value = {}
  previewPhoneList.value = {}
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