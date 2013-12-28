Implemented a collection of constructors and serializers need to create the
key/value pair record necessary to implement the LevelUP interface using Strata.

Construction of a record or key will take encoding options into account to
create a property encoded buffer.

The Strata extractor and comparator functions are implemented, but without
taking the record version into account. We'll use the extractor and comparator
builders from [Revise](https://github.com/bigeasy/revise) to build an extractor
and comparator that accounts for version.

We'll need an independent comparator to compare just the key part without the
version in our MVCC iterators. We're never going to need an independent
extractor. At this point, I'm using the extractor generator out of inertia.
Also, perhaps, out of desire to keep the comparator generator company so that it
doesn't get lonely in it's own module.

Serialization writes a UTF-8 header followed by the key and then the value.
For a record, the header includes the version number, operation and the length
of the key. The length of the value is calculated. The operation is either "get"
or "put". For a key the header includes only the version number.

## Issue By Issue

 * Implement Strata deserializer function. #15.
 * Implement Strata serializer function. #14.
 * Implement a key constructor. #13.
 * Implement record deserialization. #12.
 * Implement key deserialization. #11.
 * Implement key serialization. #10.
 * Implement record serialization. #9.
 * Implement a bytewise comparator. #8.
 * Implement a key extractor. #7.
 * Implement a pair record constructor. #5.
