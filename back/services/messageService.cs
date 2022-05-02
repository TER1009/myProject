using System.Collections.Generic;
using System;
using back.repository;
using back.DTO;

namespace back.services
{
    public class messageServise
    {
        messageRepository repository;
        public messageServise()
        {
            repository = new messageRepository();
        }

        public void create(messageDTO item)
        {
            repository.create(item);
        }
        public messageDTO getById(Guid id)
        {
            return repository.getById(id);
        }
    }
}