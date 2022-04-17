using System;
using System.Collections.Generic;
using back.models;
using back.DTO;

namespace back.services
{
    public class userDTOService
    {
        private readonly client returnClient;
        private readonly clientPersonalDataDTO clientPersonalDTO;
        private readonly clientDTO clientDTO;

        private readonly back.repository.userRepository repository = new back.repository.userRepository();

        public userDTOService()
        {
            returnClient = new client();
            clientPersonalDTO = new clientPersonalDataDTO();
            clientDTO = new clientDTO();
        }


        public client returnEntity(clientDTO clientDTO)
        {
            returnClient.nickname = clientDTO.nickname;
            returnClient.email = clientDTO.email;
            returnClient.password = clientDTO.password;
            return returnClient;
        }

        public client returnEntity(clientPersonalDataDTO clientDTO)
        {
            returnClient.token = clientDTO.token;
            returnClient.role = clientDTO.role;
            returnClient.id = clientDTO.id;
            returnClient.tokenRefresh = clientDTO.tokenRefresh;
            return returnClient;
        }

        public clientDTO returnDTO(client client)
        {
            clientDTO.email = client.email;
            clientDTO.password = client.password;
            clientDTO.nickname = client.nickname;
            return clientDTO;
        }
        public clientPersonalDataDTO returnPersonalDTO(client client)
        {
            clientPersonalDTO.token = client.token;
            clientPersonalDTO.role = client.role;
            clientPersonalDTO.id = client.id;
            clientPersonalDTO.tokenRefresh = client.tokenRefresh;
            return clientPersonalDTO;
        }


        public List<clientDTO> returnListDTO()
        {
            var list = repository.getAll();
            List<clientDTO> listDTO = new List<clientDTO>();
            for (int i = 0; i < list.Count; i++)
            {
                clientDTO item = new clientDTO
                {
                    email = list[i].email,
                    nickname = list[i].nickname,
                    password = list[i].password
                };
                listDTO.Add(item);
            }
            return listDTO;
        }

        public List<clientPersonalDataDTO> returnListPersonalDTO()
        {
            var list = repository.getAll();
            List<clientPersonalDataDTO> listDTO = new List<clientPersonalDataDTO>();
            for (int i = 0; i < list.Count; i++)
            {
                clientPersonalDataDTO item = new clientPersonalDataDTO
                {
                    token = list[i].token,
                    id = list[i].id,
                    role = list[i].role,
                    tokenRefresh = list[i].tokenRefresh
                };
                listDTO.Add(item);
            }
            return listDTO;
        }

        public clientDTO getByID(Guid id)
        {
            user user = repository.getById(id);
            return new clientDTO
            {
                email = user.email,
                nickname = user.nickname,
                password = user.password
            };
        }

        public clientDTO getByID(string token)
        {
            user user = repository.getById(token);
            return new clientDTO
            {
                email = user.email,
                nickname = user.nickname,
                password = user.password
            };
        }

        public clientPersonalDataDTO getByEmailReturnPersonalDataClientDto(string email)
        {
            var list = repository.getAll();
            var returnUser = new clientPersonalDataDTO();
            foreach (var user in list)
            {
                if (user.email == email)
                {
                    returnUser.id = user.id;
                    returnUser.role = user.role;
                    returnUser.token = user.token;
                    returnUser.tokenRefresh = user.tokenRefresh;
                    break;
                }
            }
            return returnUser;
        }

        public clientDTO getByEmailReturnClientDto(string email)
        {
            var list = repository.getAll();
            var returnUser = new clientDTO();
            foreach (var user in list)
            {
                if (user.email == email)
                {
                    returnUser.email = user.email;
                    returnUser.nickname = user.nickname;
                    returnUser.password = user.password;
                    break;
                }
            }
            return returnUser;
        }

        public clientPersonalDataDTO getByIDPersonalDataDTO(Guid id)
        {
            client user = repository.getById(id);
            return new clientPersonalDataDTO
            {
                token = user.token,
                role = user.role,
                id = user.id,
                tokenRefresh = user.tokenRefresh
            };
        }

        public clientPersonalDataDTO getByIDPersonalDataDTO(string id)
        {
            client user = repository.getById(id);
            return new clientPersonalDataDTO
            {
                token = user.token,
                role = user.role,
                id = user.id,
                tokenRefresh = user.tokenRefresh
            };
        }

        public void create(client client)
        {
            repository.create(client);
        }

        public void create(clientDTO clientDTO, clientPersonalDataDTO clientPersonalDataDTO)
        {
            var client = returnEntity(clientDTO);
            client = returnEntity(clientPersonalDataDTO);
            repository.create(client);
        }

        public clientPersonalDataDTO checkUser(clientDTO userDto)
        {
            if (userDto != null)
            {
                var result = new clientPersonalDataDTO();

                var listAll = repository.getAll();
                foreach (var item in listAll)
                {
                    if (string.Equals(item.email, userDto.email) && string.Equals(item.password, userDto.password))
                        return returnPersonalDTO(item);
                }
            }
            else return null;
            return null;
        }

        public List<clientDTO> getALLClientDTO()
        {
            var listAll = repository.getAll();
            var returnList = new List<clientDTO>();
            foreach (var item in listAll)
            {
                var user = new clientDTO()
                {
                    nickname = item.nickname,
                    email = item.email,
                    password = item.password
                };
                returnList.Add(user);
            }
            return returnList;
        }
    }
}