using System.Collections.Generic;
using System;
using back.repository;
using back.DTO;

namespace back.services
{
    public class reportPagesService
    {
        reportPagesRepository repository;
        public reportPagesService()
        {
            repository = new reportPagesRepository();
        }

        public void create(reportPagesDTO item)
        {
            repository.create(item);
        }

        public List<reportPagesDTO> getAll()
        {
            return repository.getAll();
        }
    }
}