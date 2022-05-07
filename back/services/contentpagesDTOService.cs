using System.Linq;
using System.Drawing;
using System.Collections.Generic;
using System;
using back.repository;
using back.DTO;
using back.models;

namespace back.services
{
    public class contentPagesDTOService
    {
        charactersRepository repository;
        contentpages page;
        public contentPagesDTOService()
        {
            repository = new charactersRepository();
            page = new contentpages();
        }

        public contentpages returnEntity(contentPagesDTO contentpage)
        {
            return new contentpages()
            {
                id = contentpage.id,
                typeContent = contentpage.typeContent,
                ownerId = contentpage.ownerId,
                lastEditor = contentpage.lastEditor,
                description = contentpage.description,
                pic = contentpage.pic,
                typePic = contentpage.typePic,
                name = contentpage.name,

            };
        }

        public contentPagesDTO returnDTO(contentpages contentpage)
        {
            return new contentPagesDTO()
            {
                id = contentpage.id,
                typeContent = contentpage.typeContent,
                ownerId = contentpage.ownerId,
                lastEditor = contentpage.lastEditor,
                description = contentpage.description,
                pic = contentpage.pic,
                typePic = contentpage.typePic,
                name = contentpage.name,
            };
        }

        public void create(contentPagesDTO contentpage)
        {
            repository.create(returnEntity(contentpage));
        }

        public List<contentPagesDTO> getAll()
        {
            var list = repository.getAll();
            List<contentPagesDTO> list2 = new List<contentPagesDTO>();
            for (int i = 0; i < list.Count; i++)
            {
                list2.Add(returnDTO(list[i]));
            }
            return list2;
        }
        public contentPagesDTO getById(Guid id)
        {
            return getAll().First(page => page.id == id);
        }

        public void deleteById(Guid id)
        {
            repository.deleteById(id);
        }
    }
}