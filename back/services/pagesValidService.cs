using System;
using back.DTO;

namespace back.services
{
    public class pagesValidService
    {
        public static bool check(charactersDTO character)
        {
            if (character.description != "" &&
            character.typeContent != "")
            {
                return true;
            }
            else return false;
        }
    }
}