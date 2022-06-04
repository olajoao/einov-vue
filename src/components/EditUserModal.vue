<template>
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Editando <span class="text-indigo-500">{{ user.name }}</span>
              </DialogTitle>

              <div class="mt-5">
                <label class="font-bold uppercase text-gray-600 text-xs" for="name">Nome</label>
                <input v-model="user.name" type="text" id="name" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
              </div>

              <div class="mt-2">
                <label class="font-bold uppercase text-gray-600 text-xs" for="company">Empresa</label>
                <input v-model="user.company" type="text" id="company" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
              </div>

              <div class="mt-2">
                <label class="font-bold uppercase text-gray-600 text-xs" for="email">E-mail</label>
                <input v-model="user.email" type="email" id="email" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
              </div>

              <div class="mt-3 flex items-end gap-2">
                <label class="flex-1 font-bold uppercase text-gray-600 text-xs" for="email">
                  Telefone
                  <input v-model="currentTelefone" type="tel" id="telefone" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
                </label>
                <button @click="addNumberToPreviewList" class="rounded-md bg-gray-100 hover:bg-gray-200 text-indigo-500 p-2">
                  <PlusIcon class="w-5 h-5" />
                </button>
              </div>

              <div vclass="mt-2">
                <ul>
                  <TransitionGroup>
                    <li v-for="(phone, index) in user.telefone" :key="index" class="mb-3 text-sm border border-transparent hover:border-gray-100 pl-2 rounded-md">
                      <div class="flex items-center justify-between">
                        <span>{{ index + 1 }}) {{ phone }}</span>
                        <button @click="removeItemFromList(index, user.telefone)" class="bg-gray-100 hover:bg-gray-200 rounded-md p-2">
                          <XIcon class="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </li>
                  </TransitionGroup>
                </ul>
              </div>

              <div class="mt-2">
                <label class="font-bold uppercase text-gray-600 text-xs" for="registerDate">Data de cadastro</label>
                <input v-model="user.data" type="date" id="registerDate" class="w-full rounded-md border border-gray-200 py-2 outline-1 focus:outline-indigo-500 px-3 text-sm leading-5 text-gray-700 focus:ring-0">
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
import { ref, computed, onMounted } from 'vue';
import { PlusIcon, XIcon } from '@heroicons/vue/outline';
import { useUserStore } from '@/store/UsersStore.js';

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const userStore = useUserStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  closeModal: {
    type: Function,
    default: Function
  },
  userIndex: {
    type: Number,
    default: -1
  }
});

let user = ref({
  name: '',
  company: '',
  email: '',
  telefone: [''],
  data: ''
});

let currentTelefone = ref('');

function removeItemFromList(index, list) {
  list.splice(index, 1);
}

function addNumberToPreviewList() {
  user.value.telefone.push(currentTelefone.value);
}

function addNewUser() {
  let index = props.userIndex;
  userStore.editUser(index, user.value);
  props.closeModal();
  user.value = {};
}

let isOpen = computed(() => isOpen = props.isOpen);

onMounted(() => {
  let { name, company, email, telefone, data } = userStore.users[props.userIndex];

  user.value.name = name;
  user.value.company = company;
  user.value.email = email;
  user.value.telefone = telefone;
  user.value.data = data;
});
</script>
