<script setup lang="ts">
  import { Ref, ref } from 'vue'

  import PageHeader from '@/components/PageHeader.vue'

  import { getUsers } from '@/api/users'
  import { User } from '../interfaces'
  import { getImageUrl } from '../utilities'

  const users: Ref<User[]> = ref([])

  async function fetchUsers() {
    users.value = await getUsers()
  }

  function activeIcon(user: User) {
    return user.isActive ? 'mdi-check' : 'mdi-close'
  }

  fetchUsers()
</script>

<template>
  <v-container>
    <PageHeader title="Usuarios" />
    <v-row>
      <v-col class="text-right">
        <v-btn
          :to="{ name: 'NewUser' }"
          prepend-icon="mdi-plus"
          class="bg-teal-lighten-1"
        >
          Nuevo Usuario
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table v-if="users.length > 0">
          <thead>
            <tr>
              <th></th>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Activo</th>
              <th>Roles</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <v-avatar v-if="user.imagePath" size="32">
                  <v-img :src="getImageUrl(user.imagePath)"> </v-img>
                </v-avatar>
              </td>
              <td>{{ user.username }}</td>
              <td>{{ user.fullname }}</td>
              <td><v-icon :icon="activeIcon(user)"></v-icon></td>
              <td>
                <v-chip
                  v-for="role in user.roles"
                  :key="role.id"
                  class="mx-1"
                >
                  {{ role.name }}
                </v-chip>
              </td>
              <td>
                <v-tooltip text="modificar usuario" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      :to="{ name: 'EditUser', params: { id: user.id } }"
                      v-bind="props"
                      icon
                      size="x-small"
                      variant="outlined"
                      color="teal"
                      class="mr-2"
                    >
                      <v-icon icon="mdi-pencil" />
                    </v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="cambiar contrase??a" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      :to="{ name: 'ChangePassword', params: { id: user.id } }"
                      v-bind="props"
                      icon
                      size="x-small"
                      variant="outlined"
                      color="teal"
                    >
                      <v-icon icon="mdi-key" />
                    </v-btn>
                  </template>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
