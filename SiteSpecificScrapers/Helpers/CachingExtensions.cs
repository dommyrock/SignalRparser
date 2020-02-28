using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;

namespace SiteSpecificScrapers.Helpers
{
    public static class CachingExtensions
    {
        /// <summary>
        ///  SET [fromCache = false] for fresh scrape, Gets webshops from local folder
        /// </summary>
        /// <param name="fromCache"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        /// <see cref="https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-how-to"/> for help
        public static List<string> GetFromLocalCache(bool fromCache = true, string fileName = "webshopCache.json")
        {
            string fullpath = Path.GetFullPath(fileName);

            using (StreamReader file = new StreamReader(fullpath))
            {
                string json = file.ReadToEnd();
                if (json != string.Empty && fromCache)
                    return JsonSerializer.Deserialize<List<string>>(json);
                return new List<string>();
            }
        }

        // with newtnsoft -->return JsonConvert.DeserializeObject<List<string>>(json);

        /// <summary>
        /// Caches to local bin-debug folder [if you want to cache in memory use "Lazy Cache" nuget]
        /// </summary>
        /// <param name="itemsToCache">Shop list</param>
        /// <param name="fileName">Local file name</param>
        public static void CacheToLocalCache(List<string> itemsToCache, string fileName = "webshopCache.json")
        {
            string fullpath = Path.GetFullPath(fileName);

            var json = JsonSerializer.Serialize(itemsToCache, new JsonSerializerOptions { WriteIndented = true });

            using (FileStream file = File.Create(fullpath))
            using (Utf8JsonWriter writer = new Utf8JsonWriter(file)) ;
            using JsonDocument document = JsonDocument.Parse(json);
        }

        // with newtnsoft -->  var json = JsonConvert.SerializeObject(itemsToCache, Formatting.Indented);
        //using (JsonTextWriter writer = new JsonTextWriter(file))
        //    {
        //        writer.WriteRaw(json);
        //    }

        ///With MemoryStream --TODO   <see cref="https://stackoverflow.com/questions/4771582/optimized-json-serialiser-deserialiser-as-an-extension-method"/>

        //public static List<string> GetFromLocalCache(bool fromCache = true, string fileName = "webshopCache.json")
        //{
        //    string fullpath = Path.GetFullPath(fileName);

        //}

        ///// <summary>
        ///// Caches to local bin-debug folder [if you want to cache in memory use "Lazy Cache" nuget]
        ///// </summary>
        ///// <param name="itemsToCache">Shop list</param>
        ///// <param name="fileName">Local file name</param>
        //public static void CacheToLocalCache(List<string> itemsToCache, string fileName = "webshopCache.json")
        //{
        //    string fullpath = Path.GetFullPath(fileName);

        //}

        /*Example         *
            MergeCaseObject mergeCaseObj = new MergeCaseObject();

            //Serialize  JSON to .NET obj
            using (MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(caseObject)))
            {
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(MergeCaseObject));
                mergeCaseObj = (MergeCaseObject)ser.ReadObject(ms);
            }
         *
         */
    }
}

//for .NET System.Text.Json.Serialization; see https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-how-to
// for custom converters see https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-converters-how-to?view=netcore-3.1
//For generic type extension method see https://stackoverflow.com/questions/4637383/extension-method-return-using-generics
//docs https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods