using System;
using back.repository;
using back.DTO;
using System.Collections.Generic;
using System.Linq;

namespace back.services
{
    public class chatServise
    {
        chatRepository repository;
        public chatServise()
        {
            repository = new chatRepository();
        }

        public void create(chatDTO item)
        {
            repository.create(repository.returnChat(item));
        }
        public void update(chatDTO item)
        {
            repository.update(repository.returnChat(item));
        }
        public List<chatDTO> getAll()
        {
            var list = repository.getAll();
            if (list.Count > 0)
            {
                var list2 = new List<chatDTO>();
                foreach (var item in list)
                {
                    list2.Add(repository.returnDTO(item));
                }
                return list2;
            }
            else return null;
        }
        public chatDTO getById(Guid id)
        {
            return repository.returnDTO(repository.getById(id));
        }
        public void delete(chatDTO item)
        {
            repository.delete(repository.returnChat(item));
        }
    }
}