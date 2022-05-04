using System;
using System.Collections.Generic;
using back.models;
using back.DTO;

namespace back.services
{
    public class userDTOService
    {
        private readonly user returnClient;
        private readonly clientPersonalDataDTO clientPersonalDTO;
        private readonly clientDTO clientDTO;

        private readonly back.repository.userRepository repository = new back.repository.userRepository();

        public userDTOService()
        {
            returnClient = new user();
            clientPersonalDTO = new clientPersonalDataDTO();
            clientDTO = new clientDTO();
        }


        public user returnEntity(clientDTO _clientDTO)
        {
            return new user()
            {
                nickname = _clientDTO.nickname,
                email = _clientDTO.email,
                password = _clientDTO.password,
            };
        }

        public user returnEntity(clientPersonalDataDTO _clientDTO)
        {
            return new user()
            {
                id = _clientDTO.id,
                role = _clientDTO.role,
                token = _clientDTO.token,
            };
        }

        public clientDTO returnDTO(user _client)
        {
            return new clientDTO()
            {
                nickname = _client.nickname,
                email = _client.email,
                password = _client.password,
            };
        }
        public clientPersonalDataDTO returnPersonalDTO(user _client)
        {
            return new clientPersonalDataDTO()
            {
                id = _client.id,
                role = _client.role,
                token = _client.token,
            };
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
                };
                listDTO.Add(item);
            }
            return listDTO;
        }

        public clientDTO getByID(Guid id)
        {
            return returnDTO(repository.getById(id));
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
            user user = repository.getById(id);
            return new clientPersonalDataDTO
            {
                token = user.token,
                role = user.role,
                id = user.id,
            };
        }

        public clientPersonalDataDTO getByIDPersonalDataDTO(string id)
        {
            user user = repository.getById(id);
            return new clientPersonalDataDTO
            {
                token = user.token,
                role = user.role,
                id = user.id,
            };
        }

        public void create(user client)
        {
            repository.create(client);
        }

        public void create(clientDTO clientDTO, clientPersonalDataDTO clientPersonalDataDTO)
        {
            repository.create(new user()
            {
                nickname = clientDTO.nickname,
                email = clientDTO.email,
                password = clientDTO.password,
                id = clientPersonalDataDTO.id,
                token = clientPersonalDataDTO.token,
                role = clientPersonalDataDTO.role,
            });
        }

        public clientPersonalDataDTO checkUser(clientDTO userDto)
        {
            var result = new clientPersonalDataDTO();

            var listAll = repository.getAll();
            Console.WriteLine(listAll.Count);
            foreach (var item in listAll)
            {
                if (string.Equals(item.email, userDto.email) && string.Equals(item.password, userDto.password))
                    return returnPersonalDTO(item);
            }
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